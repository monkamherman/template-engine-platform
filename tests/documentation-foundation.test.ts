import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

import { interfaceRegistry } from "../config/interface-registry"
import { routes } from "../config/routes"
import {
  assertContentIntegrity,
  documentationSlugs,
  legalSlugs,
  listDocumentationDocuments,
  listLegalDocuments,
} from "../modules/content/documents"
import {
  hasUnapprovedThirdPartyNotices,
  requiredReleasePackageFiles,
  validateReleasePackageManifest,
} from "../modules/content/release-contract"

test("localized documentation and legal content passes integrity validation", () => {
  assert.doesNotThrow(() => assertContentIntegrity())
  assert.equal(listLegalDocuments("fr").length, legalSlugs.length)
  assert.equal(listDocumentationDocuments("en").length, documentationSlugs.length)
})

test("new legal and documentation routes are registered interfaces", () => {
  const registeredPaths = new Set(interfaceRegistry.flatMap((entry) => (entry.buildPath ? [entry.buildPath("fr")] : [])))

  for (const slug of legalSlugs) {
    assert.equal(registeredPaths.has(routes.legal.document("fr", slug)), true, slug)
  }

  for (const slug of documentationSlugs) {
    assert.equal(registeredPaths.has(routes.docs.article("fr", slug)), true, slug)
  }

  assert.equal(registeredPaths.has(routes.admin.legal("fr")), true)
  assert.equal(registeredPaths.has(routes.admin.documentation("fr")), true)
})

test("documentation detail interfaces are branded content pages", () => {
  for (const slug of documentationSlugs) {
    const id = slug ? `docs.${slug.replaceAll("/", ".")}` : "docs.home"
    const entry = interfaceRegistry.find((item) => item.id === id)

    assert.equal(entry?.maturity, "BRANDED", id)
    assert.equal(entry?.dataMode, "content", id)
    assert.match(entry?.notes ?? "", slug ? /breadcrumbs, review\/version metadata/ : /documentation home/)
  }
})

test("documentation detail shell exposes article navigation, review and support boundaries", () => {
  const shell = readFileSync("components/layout/document-shell.tsx", "utf8")
  const route = readFileSync("app/[locale]/(marketing)/docs/[...segments]/page.tsx", "utf8")

  assert.match(shell, /Breadcrumb/)
  assert.match(shell, /onThisPage/)
  assert.match(shell, /RelatedLinksCard/)
  assert.match(shell, /SupportCard/)
  assert.match(shell, /ReleaseOverview/)
  assert.match(shell, /does not publish final compatibility/)
  assert.match(shell, /without sharing keys, tokens, passwords, card data or provider secrets/)
  assert.match(route, /productVersionRange={document\.productVersionRange}/)
  assert.match(route, /relatedLinks={document\.relatedLinks}/)
  assert.match(route, /releaseVersion={document\.releaseVersion}/)
})

test("release documentation remains cautious until approval", () => {
  const release = listDocumentationDocuments("fr").find((document) => document.slug === "releases/1.0.0")

  assert.equal(release?.releaseVersion, "1.0.0")
  assert.equal(release?.reviewStatus, "TECH_REVIEW")
  assert.match(release?.productVersionRange ?? "", /unreleased/)
  assert.doesNotMatch(release?.summary ?? "", /compatible|approuvee|approved/i)
})

test("content links remain localized internal routes", () => {
  const documents = [...listLegalDocuments("fr"), ...listDocumentationDocuments("fr")]

  for (const document of documents) {
    for (const link of document.relatedLinks) {
      assert.match(link, /^\/fr\//, `${document.id}: ${link}`)
      assert.doesNotMatch(link, /example\.com|http:|https:/, `${document.id}: ${link}`)
    }
  }
})

test("release package contract requires all customer documentation files", () => {
  assert.deepEqual(validateReleasePackageManifest([...requiredReleasePackageFiles]), [])
  assert.deepEqual(validateReleasePackageManifest(["README.md"]), [
    "LICENSE.txt",
    "COPYRIGHT.md",
    "THIRD_PARTY_NOTICES.md",
    "QUICKSTART.md",
    "INSTALLATION.md",
    "UPGRADE.md",
    "TROUBLESHOOTING.md",
    "CHANGELOG.md",
  ])
})

test("third-party notice inventory blocks unapproved entries", () => {
  assert.equal(
    hasUnapprovedThirdPartyNotices([
      {
        name: "dependency",
        version: "1.0.0",
        sourceRef: "package:dependency",
        licenseIdentifier: "MIT",
        includedInDistribution: true,
        noticeRequirement: "Include notice in THIRD_PARTY_NOTICES.md",
        reviewStatus: "PENDING_REVIEW",
      },
    ]),
    true,
  )
})

test("customer acceptance schema avoids unapproved IP and user-agent collection", () => {
  const schema = readFileSync("prisma/schema.prisma", "utf8")
  const customerAcceptanceModel = schema.slice(schema.indexOf("model CustomerAcceptance"))

  assert.match(customerAcceptanceModel, /acceptedAt/)
  assert.doesNotMatch(customerAcceptanceModel, /ipAddress|userAgent/)
})

test("offer and license previews expose legal and documentation references", () => {
  const offerLinks = readFileSync("components/marketing/offer-legal-links.tsx", "utf8")
  const pricingPage = readFileSync("components/marketing/pricing/pricing-page.tsx", "utf8")
  const licensePreview = readFileSync("components/account/license-key-preview.tsx", "utf8")
  const adminPreview = readFileSync("components/admin/review-workspace-preview.tsx", "utf8")

  assert.match(offerLinks, /routes\.legal\.softwareLicense/)
  assert.match(offerLinks, /routes\.legal\.commercialTerms/)
  assert.match(offerLinks, /routes\.legal\.supportPolicy/)
  assert.match(pricingPage, /routes\.docs\.article\(locale, "getting-started"\)/)
  assert.match(licensePreview, /TEP-PRVW/)
  assert.match(licensePreview, /routes\.docs\.article\(locale, "activation"\)/)
  assert.match(adminPreview, /Publish version/)
  assert.match(adminPreview, /disabled/)
})
