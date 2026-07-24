import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

import { interfaceRegistry } from "@/config/interface-registry"
import { getAdminCommerceData } from "@/modules/admin/admin-commerce-query"

test("admin commerce fixtures keep monetary values and provider references safe", () => {
  const data = getAdminCommerceData("fr")

  assert.ok(data.customers.length > 0)
  assert.ok(data.products.length > 0)
  assert.ok(data.offers.length > 0)
  assert.ok(data.prices.length > 0)
  assert.ok(data.orders.length > 0)
  assert.ok(data.payments.length > 0)

  for (const price of data.prices) {
    assert.equal(Number.isInteger(price.amountMinor), true)
    assert.match(price.currency, /^(EUR|USD)$/)
  }

  for (const order of data.orders) {
    assert.equal(Number.isInteger(order.totalMinor), true)
    for (const item of order.items) {
      assert.equal(Number.isInteger(item.unitAmountMinor), true)
    }
  }

  for (const payment of data.payments) {
    assert.match(payment.providerReferencePreview, /\*\*\*\*/)
    assert.match(payment.eventIdPreview, /\*\*\*\*/)
    assert.equal("providerPayload" in payment, false)
    assert.equal("providerSecret" in payment, false)
  }
})

test("admin commerce pages disable write and destructive preview actions", () => {
  const source = readFileSync("components/admin/admin-commerce-pages.tsx", "utf8")

  assert.match(source, /Write actions, refunds, publishing and deletion remain disabled/)
  assert.match(source, /<Button disabled/)
  assert.match(source, /Preview creation: no product is persisted/)
  assert.match(source, /No secret, complete provider payload or complete key is exposed/)
})

test("sprint 11a admin commerce interfaces are registered as branded", () => {
  const brandedIds = new Set(
    interfaceRegistry
      .filter((entry) => entry.audience === "admin" && entry.notes.includes("Sprint 11A"))
      .map((entry) => entry.id)
  )

  for (const id of [
    "admin.dashboard",
    "admin.customers",
    "admin.customer-detail",
    "admin.products",
    "admin.product-new",
    "admin.product-detail",
    "admin.offers",
    "admin.offer-detail",
    "admin.prices",
    "admin.orders",
    "admin.order-detail",
    "admin.payments",
    "admin.payment-detail",
  ]) {
    assert.equal(brandedIds.has(id), true, id)
  }
})
