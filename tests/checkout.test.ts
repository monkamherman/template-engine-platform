import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

import { interfaceRegistry } from "@/config/interface-registry"
import { getCheckoutPreviewData } from "@/modules/checkout/checkout-preview-query"

test("checkout preview data uses minor-unit amounts and draft legal references", () => {
  const data = getCheckoutPreviewData("fr")

  assert.equal(data.plans.length, 3)
  assert.equal(data.selectedPlanId, "starter")

  for (const plan of data.plans) {
    if (plan.amountMinor !== undefined) {
      assert.equal(Number.isInteger(plan.amountMinor), true)
      assert.equal(plan.currency, "EUR")
    }
    assert.equal("provider" in plan, false)
    assert.equal("paymentIntent" in plan, false)
  }

  for (const term of data.terms) {
    assert.match(term.version, /^draft-|review/)
    assert.notEqual(term.status, "approved")
  }
})

test("checkout UI does not invent provider success or collect secrets", () => {
  const source = readFileSync("components/checkout/checkout-pages.tsx", "utf8")

  assert.match(source, /No payment provider is connected/)
  assert.match(source, /No card data, provider secret, license key or token is collected/)
  assert.match(source, /No real order number is invented/)
  assert.match(source, /<Button disabled/)
  assert.doesNotMatch(source, /Stripe|PayPal|Mobile Money|paymentIntentSecret|clientSecret/)
})

test("checkout interfaces are registered as branded preview", () => {
  for (const id of ["checkout.index", "checkout.success", "checkout.failed"]) {
    const entry = interfaceRegistry.find((item) => item.id === id)

    assert.equal(entry?.maturity, "BRANDED")
    assert.equal(entry?.dataMode, "preview")
    assert.match(entry?.notes ?? "", /no invented provider/)
  }
})
