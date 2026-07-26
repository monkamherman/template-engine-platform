import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

import robots from "../app/robots"
import sitemap from "../app/sitemap"
import {
  buildLanguageAlternates,
  buildPublicPageMetadata,
  buildRootMetadata,
  listPublicSeoPaths,
} from "../config/seo"
import { routes } from "../config/routes"

test("root metadata uses configured site URL instead of placeholder domain", () => {
  const metadata = buildRootMetadata()

  assert.notEqual(metadata.metadataBase?.toString(), "https://example.com/")
  assert.equal(metadata.title?.toString().includes("example.com"), false)
  assert.equal(metadata.openGraph?.siteName, "Template Engine Platform")
})

test("public page metadata includes canonical and localized alternates", () => {
  const metadata = buildPublicPageMetadata("fr", "pricing", routes.marketing.pricing("fr"))

  assert.equal(metadata.alternates?.canonical, "/fr/pricing")
  assert.deepEqual(metadata.alternates?.languages, {
    fr: "/fr/pricing",
    en: "/en/pricing",
    "x-default": "/fr/pricing",
  })
  assert.equal(metadata.openGraph?.url, "/fr/pricing")
  assert.equal(typeof metadata.robots === "object" && metadata.robots !== null && metadata.robots.index, true)
})

test("language alternates preserve deep localized paths", () => {
  assert.deepEqual(buildLanguageAlternates("/en/docs/releases/1.0.0"), {
    fr: "/fr/docs/releases/1.0.0",
    en: "/en/docs/releases/1.0.0",
    "x-default": "/fr/docs/releases/1.0.0",
  })
})

test("sitemap lists public indexable routes and excludes private or transactional areas", () => {
  const paths = listPublicSeoPaths()
  const entries = sitemap()
  const urls = entries.map((entry) => new URL(entry.url).pathname)

  assert.equal(paths.includes("/fr"), true)
  assert.equal(paths.includes("/en/pricing"), true)
  assert.equal(paths.includes("/fr/docs/installation"), true)
  assert.equal(paths.includes("/en/legal/privacy"), true)
  assert.equal(paths.some((path) => path.includes("/account")), false)
  assert.equal(paths.some((path) => path.includes("/admin")), false)
  assert.equal(paths.some((path) => path.includes("/checkout")), false)
  assert.deepEqual(urls, paths)
})

test("robots blocks private, admin, api and checkout routes", () => {
  const config = robots()
  const rules = Array.isArray(config.rules) ? config.rules[0] : config.rules
  const disallowed = rules.disallow ?? []

  assert.equal(disallowed.includes("/api/"), true)
  assert.equal(disallowed.includes("/fr/account/"), true)
  assert.equal(disallowed.includes("/en/admin/"), true)
  assert.equal(disallowed.includes("/fr/checkout/"), true)
  assert.match(config.sitemap?.toString() ?? "", /\/sitemap\.xml$/)
})

test("sensitive route groups define noindex metadata", () => {
  const files = [
    "app/[locale]/(auth)/layout.tsx",
    "app/[locale]/account/layout.tsx",
    "app/[locale]/admin/layout.tsx",
    "app/[locale]/(marketing)/checkout/page.tsx",
    "app/[locale]/(marketing)/checkout/success/page.tsx",
    "app/[locale]/(marketing)/checkout/failed/page.tsx",
  ]

  for (const file of files) {
    const source = readFileSync(file, "utf8")

    assert.match(source, /index: false/, file)
    assert.match(source, /follow: false/, file)
  }
})
