import assert from "node:assert/strict"
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
})

test("account core fixtures include required access states", () => {
  const statuses = new Set(getAccountCoreData("en").entitlements.map((entitlement) => entitlement.status))

  assert.equal(statuses.has("active"), true)
  assert.equal(statuses.has("pending"), true)
  assert.equal(statuses.has("expired"), true)
})
