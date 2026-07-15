import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

import { interfaceRegistry } from "../config/interface-registry"
import { accountNavigation, adminNavigation, publicNavigation } from "../config/navigation"
import { routes } from "../config/routes"
import { getInterfacePreviewById, getInterfacePreviewByPath } from "../modules/platform/interface-query"

test("route builders produce localized V1 interface paths", () => {
  assert.equal(routes.home("fr"), "/fr")
  assert.equal(routes.marketing.offer("en", "pro"), "/en/offers/pro")
  assert.equal(routes.account.licenseDetail("fr", "lic_preview"), "/fr/account/licenses/lic_preview")
  assert.equal(routes.admin.releaseDetail("en", "rel_preview"), "/en/admin/releases/rel_preview")
})

test("interface registry has unique IDs and resolved preview routes", () => {
  const ids = new Set<string>()

  for (const entry of interfaceRegistry) {
    assert.equal(ids.has(entry.id), false, `duplicate interface id: ${entry.id}`)
    ids.add(entry.id)

    assert.match(entry.routePattern, /^\/\{locale\}|^\/\{locale\}$/)

    if (entry.buildPath) {
      const frPath = entry.buildPath("fr")
      const enPath = entry.buildPath("en")

      assert.match(frPath, /^\/fr(\/|$)/, entry.id)
      assert.match(enPath, /^\/en(\/|$)/, entry.id)
      assert.doesNotMatch(frPath, /\{|\}/, entry.id)
    }
  }
})

test("navigation entries resolve to registered interfaces", () => {
  const hrefs = [...publicNavigation, ...accountNavigation, ...adminNavigation].map((item) => item.href("fr"))
  const registeredHrefs = new Set(interfaceRegistry.flatMap((entry) => (entry.buildPath ? [entry.buildPath("fr")] : [])))

  for (const href of hrefs) {
    assert.equal(registeredHrefs.has(href), true, `missing registered interface for ${href}`)
  }
})

test("dynamic preview lookup maps real paths to the expected interfaces", () => {
  assert.equal(getInterfacePreviewByPath("fr", ["offers", "starter"]).entry.id, "marketing.offer-starter")
  assert.equal(getInterfacePreviewByPath("fr", ["demos", "dropshipping-modele"]).entry.id, "marketing.demo-detail")
  assert.equal(getInterfacePreviewByPath("fr", ["account", "orders", "ord_preview"]).entry.id, "account.order-detail")
  assert.equal(getInterfacePreviewByPath("en", ["admin", "catalog", "products", "prd_preview"]).entry.id, "admin.product-detail")
})

test("interface preview exposes required skeleton states for protected areas", () => {
  const accountPreview = getInterfacePreviewById("fr", "account.dashboard")
  const adminPreview = getInterfacePreviewById("fr", "admin.dashboard")

  assert.ok(accountPreview.states.loading)
  assert.ok(accountPreview.states.empty)
  assert.ok(accountPreview.states.error)
  assert.ok(accountPreview.states.forbidden)
  assert.ok(adminPreview.states.forbidden)
  assert.ok(accountPreview.records.length > 0)
})

test("development interface map is explicitly production-hidden", () => {
  const source = readFileSync("app/[locale]/dev/interfaces/page.tsx", "utf8")

  assert.match(source, /process\.env\.NODE_ENV === "production"/)
  assert.match(source, /notFound\(\)/)
})

test("marketing shell exposes language toggle in header and footer", () => {
  const shellSource = readFileSync("components/layout/shells.tsx", "utf8")
  const toggleSource = readFileSync("components/navigation/language-toggle.tsx", "utf8")

  assert.match(shellSource, /<LanguageToggle locale=\{locale\}/)
  assert.match(shellSource, /<LanguageToggle compact locale=\{locale\}/)
  assert.match(toggleSource, /usePathname/)
  assert.match(toggleSource, /\[locale, \.\.\.segments\.slice\(1\)\]/)
})
