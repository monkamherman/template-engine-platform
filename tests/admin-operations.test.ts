import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

import { interfaceRegistry } from "@/config/interface-registry"
import { getAdminOperationsData } from "@/modules/admin/admin-operations-query"

test("admin operations fixtures mask license keys and secrets", () => {
  const data = getAdminOperationsData("fr")

  for (const license of data.licenses) {
    assert.match(license.maskedKey, /\*\*\*\*/)
    assert.equal(license.maskedKey.includes(license.keyPrefix), true)
    assert.equal(license.maskedKey.endsWith(license.keyLast4), true)
    assert.doesNotMatch(license.maskedKey, /^TEP1-[A-Z0-9]{4}(?:-[A-Z0-9]{4}){6}$/)
    assert.equal("completeKey" in license, false)
    assert.equal("secretCiphertext" in license, false)
  }

  for (const setting of data.settings) {
    if (setting.secret) {
      assert.doesNotMatch(setting.valuePreview, /-----BEGIN|[A-Fa-f0-9]{32,}|TEP1-/)
    }
  }

  for (const event of data.auditEvents) {
    assert.doesNotMatch(event.summary, /TEP1-[A-Z0-9-]{20,}|-----BEGIN|ciphertext|token=/i)
  }
})

test("admin operations fixtures preserve legal and release safety states", () => {
  const data = getAdminOperationsData("en")

  assert.equal(data.legalDocuments.some((document) => document.status === "draft"), true)
  assert.equal(data.legalDocuments.some((document) => document.status === "review"), true)

  for (const document of data.legalDocuments) {
    if (document.status !== "published") {
      assert.notEqual(document.version, "approved")
    }
  }

  for (const release of data.releases) {
    if (release.checksumSha256) {
      assert.match(release.checksumSha256, /^[a-f0-9]{64}$/)
    }
    assert.equal("signedUrl" in release, false)
    assert.equal("storageSecret" in release, false)
  }
})

test("admin operations UI states sensitive-action and secret boundaries", () => {
  const source = readFileSync("components/admin/admin-operations-pages.tsx", "utf8")

  assert.match(source, /No complete key, private key, pepper, ciphertext, token, provider secret or signed URL is exposed/)
  assert.match(source, /Draft\/review documents remain explicitly not approved/)
  assert.match(source, /Releases show only available checksums; no compatibility is invented/)
  assert.match(source, /<Button disabled/)
})

test("sprint 11b admin operations interfaces are registered as branded", () => {
  const ids = new Set(
    interfaceRegistry
      .filter((entry) => entry.audience === "admin" && entry.notes.includes("Sprint 11B"))
      .map((entry) => entry.id)
  )

  for (const id of [
    "admin.entitlements",
    "admin.entitlement-detail",
    "admin.license-detail",
    "admin.releases",
    "admin.release-new",
    "admin.release-detail",
    "admin.legal-documents",
    "admin.support",
    "admin.support-detail",
    "admin.audit",
    "admin.settings",
  ]) {
    assert.equal(ids.has(id), true, id)
  }
})
