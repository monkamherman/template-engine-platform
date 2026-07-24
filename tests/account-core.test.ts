import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

import { getAccountCoreData } from "@/modules/account/account-query"

test("account core fixtures avoid exposing full license keys or signed download URLs", () => {
  const data = getAccountCoreData("fr")

  assert.ok(data.orders.length > 0)
  assert.ok(data.entitlements.length > 0)
  assert.ok(data.downloads.length > 0)
  assert.ok(data.releases.length > 0)

  for (const entitlement of data.entitlements) {
    assert.doesNotMatch(entitlement.licensePreview, /[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/)
    assert.match(entitlement.licensePreview, /\*\*\*\*|Not issued/)
  }

  for (const download of data.downloads) {
    assert.match(download.checksumSha256, /^[a-f0-9]{64}$/)
    assert.equal("signedUrl" in download, false)
  }

  for (const license of data.licenses) {
    assert.match(license.maskedKey, /\*\*\*\*/)
    assert.equal(license.maskedKey.includes(license.keyPrefix), true)
    assert.equal(license.maskedKey.endsWith(license.keyLast4), true)
    assert.doesNotMatch(license.maskedKey, /^TEP1-[A-Z0-9]{4}(?:-[A-Z0-9]{4}){6}$/)
    assert.equal("licenseKey" in license, false)
    assert.equal("completeKey" in license, false)
  }
})

test("account core fixtures include required access states", () => {
  const statuses = new Set(getAccountCoreData("en").entitlements.map((entitlement) => entitlement.status))

  assert.equal(statuses.has("active"), true)
  assert.equal(statuses.has("pending"), true)
  assert.equal(statuses.has("expired"), true)
})

test("account secondary fixtures include support and onboarding workflow states", () => {
  const data = getAccountCoreData("fr")
  const onboardingStates = new Set(data.onboarding.map((request) => request.status))
  const supportStates = new Set(data.supportTickets.map((ticket) => ticket.status))

  assert.equal(onboardingStates.has("needs_customer_action"), true)
  assert.equal(onboardingStates.has("in_review"), true)
  assert.equal(supportStates.has("in_review"), true)
  assert.equal(supportStates.has("closed"), true)
})

test("account secondary UI states license service boundary and disables preview persistence", () => {
  const source = readFileSync("components/account/account-support-settings-pages.tsx", "utf8")

  assert.match(source, /does not intentionally disable the public storefront/)
  assert.match(source, /ne desactive pas volontairement le storefront public/)
  assert.match(source, /This form does not persist anything in this sprint/)
  assert.match(source, /Ce formulaire ne persiste rien dans cette sprint/)
  assert.match(source, /<Button disabled/)
})
