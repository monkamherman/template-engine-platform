import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import { generateKeyPairSync, randomBytes } from "node:crypto"
import test from "node:test"

import {
  canonicalizeLicenseKey,
  decryptLicenseKey,
  encryptLicenseKey,
  formatLicenseKey,
  generateLicenseKey,
  hashLicenseKey,
  isActivationLimitReached,
  MemoryLicenseRateLimiter,
  normalizeActivationDomain,
  parseLicenseEnvironment,
  signLicenseLease,
  verifyLicenseKeyHash,
  verifyLicenseLease,
} from "../modules/licensing"
import { handleLicenseRoute } from "../modules/licensing/http/protocol"
import { activateLicenseRequestSchema } from "../modules/licensing/schemas"
import { LicensingError } from "../modules/licensing/errors"

test("generates and canonicalizes protocol v1 license keys", () => {
  const key = generateLicenseKey(Buffer.alloc(20, 7))

  assert.match(key.displayKey, /^TEP1(?:-[0-9A-HJKMNP-TV-Z]{4}){8}$/)
  assert.equal(key.canonicalKey.length, 36)
  assert.equal(formatLicenseKey(key.canonicalKey), key.displayKey)
  assert.equal(canonicalizeLicenseKey(key.displayKey.toLowerCase()), key.canonicalKey)
  assert.match(key.keyPrefix, /^TEP1-[0-9A-HJKMNP-TV-Z]{4}-[0-9A-HJKMNP-TV-Z]{4}$/)
  assert.equal(key.keyLast4.length, 4)
})

test("hash verification uses keyed hash without decrypting", () => {
  const { canonicalKey } = generateLicenseKey(Buffer.alloc(20, 9))
  const hash = hashLicenseKey(canonicalKey, "pepper-with-at-least-32-characters")

  assert.equal(verifyLicenseKeyHash(canonicalKey, hash, "pepper-with-at-least-32-characters"), true)
  assert.equal(verifyLicenseKeyHash(canonicalKey, hash, "different-pepper-with-32-characters"), false)
})

test("encrypts license keys with AES-GCM and rejects tampering", () => {
  const key = randomBytes(32)
  const { canonicalKey } = generateLicenseKey(Buffer.alloc(20, 3))
  const encrypted = encryptLicenseKey(canonicalKey, key)

  assert.notEqual(encrypted.secretCiphertext, canonicalKey)
  assert.equal(decryptLicenseKey(encrypted, key), canonicalKey)
  assert.throws(() =>
    decryptLicenseKey(
      {
        ...encrypted,
        secretCiphertext: encrypted.secretCiphertext.replace(/.$/, encrypted.secretCiphertext.endsWith("A") ? "B" : "A"),
      },
      key,
    ),
  )
})

test("normalizes activation domains according to protocol rules", () => {
  assert.equal(normalizeActivationDomain("https://Shop.Example.com/path?x=1"), "shop.example.com")
  assert.equal(normalizeActivationDomain("http://localhost:8080/test"), "localhost:8080")
  assert.equal(normalizeActivationDomain("https://www.example.com."), "www.example.com")
  assert.throws(() => normalizeActivationDomain("ftp://example.com"))
})

test("enforces production and staging activation limits independently", () => {
  assert.equal(
    isActivationLimitReached({ activeCount: 1, environment: "PRODUCTION", productionLimit: 1, stagingLimit: 5 }),
    true,
  )
  assert.equal(
    isActivationLimitReached({ activeCount: 1, environment: "STAGING", productionLimit: 1, stagingLimit: 5 }),
    false,
  )
})

test("signs and verifies offline license leases", () => {
  const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 3072 })
  const signed = signLicenseLease({
    claims: {
      sub: "lic_test",
      activationId: "act_test",
      installationId: "6df54c7c-e60a-4e31-8bdc-4ecf3b22bc4b",
      domain: "shop.example.com",
      environment: "PRODUCTION",
      licenseStatus: "ACTIVE",
      officialUpdates: true,
      protectedDownloads: true,
      support: true,
      updatesUntil: null,
      supportUntil: null,
    },
    gracePeriodSeconds: 604800,
    keyId: "test-kid",
    privateKeyPem: privateKey.export({ format: "pem", type: "pkcs8" }).toString(),
    now: new Date("2026-07-15T12:00:00.000Z"),
    ttlSeconds: 259200,
  })

  const verified = verifyLicenseLease({
    expectedDomain: "shop.example.com",
    expectedEnvironment: "PRODUCTION",
    expectedInstallationId: "6df54c7c-e60a-4e31-8bdc-4ecf3b22bc4b",
    expectedKeyId: "test-kid",
    publicKeyPem: publicKey.export({ format: "pem", type: "spki" }).toString(),
    token: signed.token,
  })

  assert.equal(verified.aud, "woo-app-theme")
  assert.equal(verified.domain, "shop.example.com")
  assert.throws(() =>
    verifyLicenseLease({
      expectedDomain: "evil.example.com",
      expectedEnvironment: "PRODUCTION",
      expectedInstallationId: "6df54c7c-e60a-4e31-8bdc-4ecf3b22bc4b",
      expectedKeyId: "test-kid",
      publicKeyPem: publicKey.export({ format: "pem", type: "spki" }).toString(),
      token: signed.token,
    }),
  )
})

test("validates license environment configuration", () => {
  const key = randomBytes(32).toString("base64url")
  const parsed = parseLicenseEnvironment({
    LICENSE_HASH_PEPPER_V1: "pepper-with-at-least-32-characters",
    LICENSE_ENCRYPTION_KEY_V1: key,
    LICENSE_SIGNING_PRIVATE_KEY_PEM: "private",
    LICENSE_SIGNING_PUBLIC_KEY_PEM: "public",
    LICENSE_SIGNING_KEY_ID: "kid",
    LICENSE_LEASE_TTL_SECONDS: "259200",
    LICENSE_GRACE_PERIOD_SECONDS: "604800",
    LICENSE_RATE_LIMIT_MODE: "memory",
  } as unknown as NodeJS.ProcessEnv)

  assert.equal(parsed.LICENSE_ENCRYPTION_KEY_V1.length, 32)
  assert.throws(() =>
    parseLicenseEnvironment({
      LICENSE_HASH_PEPPER_V1: "short",
      LICENSE_ENCRYPTION_KEY_V1: "bad",
    } as unknown as NodeJS.ProcessEnv),
  )
})

test("memory rate limiter blocks repeated requests deterministically", async () => {
  const limiter = new MemoryLicenseRateLimiter(1, 60_000)
  const input = { endpoint: "activate" as const, clientId: "client", licensePrefix: "TEP1-AAAA-BBBB" }

  assert.equal((await limiter.consume(input)).allowed, true)
  assert.equal((await limiter.consume(input)).allowed, false)
})

test("license route protocol rejects missing protocol header", async () => {
  const response = await handleLicenseRoute(
    new Request("https://platform.test/api/licenses/activate", {
      method: "POST",
      body: "{}",
    }),
    activateLicenseRequestSchema,
    async () => ({}),
  )
  const body = (await response.json()) as { ok: boolean; error: { code: string } }

  assert.equal(response.status, 400)
  assert.equal(response.headers.get("x-tep-protocol"), "1")
  assert.equal(body.ok, false)
  assert.equal(body.error.code, "BAD_REQUEST")
})

test("license route protocol maps invalid license errors generically", async () => {
  const response = await handleLicenseRoute(
    new Request("https://platform.test/api/licenses/activate", {
      method: "POST",
      headers: {
        "x-tep-protocol": "1",
      },
      body: JSON.stringify({
        licenseKey: generateLicenseKey(Buffer.alloc(20, 1)).displayKey,
        installationId: "6df54c7c-e60a-4e31-8bdc-4ecf3b22bc4b",
        siteUrl: "https://shop.example.com",
        environment: "PRODUCTION",
        productSlug: "woo-app-theme",
        themeVersion: "1.0.0",
      }),
    }),
    activateLicenseRequestSchema,
    async () => {
      throw new LicensingError("INVALID_LICENSE")
    },
  )
  const body = (await response.json()) as { ok: boolean; error: { code: string; message: string } }

  assert.equal(response.status, 401)
  assert.equal(body.error.code, "INVALID_LICENSE")
  assert.equal(body.error.message, "The license could not be validated.")
})

test("protocol fixture package exists for cross-repository integration", () => {
  const fixtureDir = "tests/fixtures/license-protocol"
  const required = [
    "activate-request.json",
    "activate-success.json",
    "validate-request.json",
    "validate-success.json",
    "deactivate-request.json",
    "deactivate-success.json",
    "invalid-license.json",
    "limit-reached.json",
    "suspended-license.json",
    "revoked-license.json",
    "lease-valid.txt",
    "lease-expired.txt",
    "lease-tampered.txt",
    "domain-normalization.json",
  ]

  for (const file of required) {
    assert.equal(existsSync(`${fixtureDir}/${file}`), true, file)
    if (file.endsWith(".json")) {
      const parsed = JSON.parse(readFileSync(`${fixtureDir}/${file}`, "utf8")) as { protocolVersion: number; fixtureRevision: number }
      assert.equal(parsed.protocolVersion, 1, file)
      assert.equal(parsed.fixtureRevision, 1, file)
    }
  }
})

test("admin license route uses the API workbench interface", () => {
  const adminRoute = readFileSync("app/[locale]/admin/[...segments]/page.tsx", "utf8")
  const workbench = readFileSync("components/admin/license-api-workbench.tsx", "utf8")

  assert.match(adminRoute, /<LicenseApiWorkbench locale=\{locale\}/)
  assert.match(workbench, /\/api\/licenses\/\$\{endpoint\}/)
  assert.match(workbench, /"X-TEP-Protocol": "1"/)
  assert.match(workbench, /SEED_DEV_LICENSE=true pnpm db:seed/)
})
