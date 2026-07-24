import type { DocumentationContentDocument } from "@/content/shared/document-types"

const review = {
  locale: "en",
  productVersionRange: "theme:unreleased-v1",
  lastReviewedAt: "2026-07-15",
  reviewStatus: "TECH_REVIEW",
  visibility: "public",
  owner: "documentation",
} as const

const doc = (
  id: string,
  slug: string,
  title: string,
  summary: string,
  sectionTitle: string,
  body: string[],
  relatedLinks: string[],
  releaseVersion?: string,
) => ({
  ...review,
  id,
  slug,
  title,
  summary,
  releaseVersion,
  relatedLinks,
  sections: [{ id: "overview", title: sectionTitle, body }],
})

export const englishDocumentationDocuments: DocumentationContentDocument[] = [
  doc("docs.home", "", "Customer documentation", "Versioned guide for installing, activating, configuring and maintaining Template Engine.", "Main path", [
    "Start with requirements, then installation, official activation and initial setup.",
    "Guides remain in technical draft until the first theme release is validated.",
  ], ["/en/docs/getting-started", "/en/docs/requirements", "/en/legal/software-license"]),
  doc("docs.getting-started", "getting-started", "Getting started", "Overview from customer account to a testable store.", "Checklist", [
    "Confirm the active offer, download the right package, prepare a clean WordPress install and keep the key private.",
    "Run a test order after WooCommerce activation and before production use.",
  ], ["/en/docs/requirements", "/en/docs/installation", "/en/docs/activation"]),
  doc("docs.requirements", "requirements", "Requirements", "Confirm prerequisites without publishing untested compatibility ranges.", "Environment", [
    "Prepare WordPress, WooCommerce, SSL, backups, administrator access and enough upload capacity.",
    "Exact PHP/WooCommerce versions will be published only after the compatibility matrix is tested.",
  ], ["/en/docs/installation", "/en/docs/backup-rollback"]),
  doc("docs.installation", "installation", "Installation", "Install the official theme package without confusing product ZIP, private source and documentation.", "Official package", [
    "Download the file from the customer account when the entitlement allows it.",
    "Verify file name, version and checksum from the platform before uploading to WordPress.",
  ], ["/en/docs/activation", "/en/docs/troubleshooting"]),
  doc("docs.activation", "activation", "Official activation", "Understand the technical key, activation limits and production/staging environments.", "Activation limits", [
    "The key gives access to official services: updates, metadata and support according to the active offer.",
    "Production and staging should be declared as separate installations once the service is connected.",
  ], ["/en/account/licenses", "/en/legal/software-license", "/en/docs/updates"]),
  doc("docs.initial-setup", "initial-setup", "Initial setup", "Configure WooCommerce, language, currency, pages and basic checks.", "WooCommerce checks", [
    "Check cart, checkout, customer account pages, currency, taxes and emails before importing a catalog.",
    "Every major change should be tested on staging or with a usable backup.",
  ], ["/en/docs/shop-models", "/en/docs/products", "/en/docs/payments"]),
  doc("docs.shop-models", "shop-models", "Shop models", "Compare dropshipping, stock, hybrid and digital before configuration.", "Operational choice", [
    "The selected model influences catalog, emails, shipping, stock and support responsibilities.",
    "Scenarios are explanatory and are not performance promises.",
  ], ["/en/use-cases", "/en/docs/niches", "/en/docs/products"]),
  doc("docs.niches", "niches", "Niches and content", "Prepare demo content and usage limits.", "Customer content", [
    "The customer remains responsible for copy, images, prices, regulatory obligations and commercial claims.",
    "Demo visuals must be replaced with authorized assets before production.",
  ], ["/en/docs/shop-models", "/en/docs/customization"]),
  doc("docs.localization", "localization", "Localization", "Configure language, currency, labels and formats without mixing locales.", "Source locale", [
    "French is the initial editorial source; English must stay synchronized with the same content IDs.",
    "Screenshots and labels must follow the active interface.",
  ], ["/en/docs/initial-setup", "/en/docs/customization"]),
  doc("docs.products", "products", "Products", "Create products, variations and stock behavior for the selected model.", "Catalog", [
    "Start with a few test products and verify prices, taxes, shipping and emails before bulk import.",
    "Digital products should be tested with delivery and customer access separately.",
  ], ["/en/docs/shop-models", "/en/docs/payments"]),
  doc("docs.payments", "payments", "Payments", "Verify WooCommerce payment methods and test orders.", "Checkout test", [
    "Enable test mode with the selected payment provider and verify cart, checkout and account flows.",
    "Merchant-account or regulatory issues are not automatic platform actions.",
  ], ["/en/docs/initial-setup", "/en/docs/troubleshooting"]),
  doc("docs.customization", "customization", "Customization", "Adapt brand, colors, sections and modification boundaries.", "Safe limits", [
    "Use approved options or a child theme for code changes once documented.",
    "Avoid editing the official package directly because it blocks clean updates.",
  ], ["/en/docs/localization", "/en/legal/trademark"]),
  doc("docs.updates", "updates", "Updates", "Prepare backup, staging, changelog review and rollback.", "Process", [
    "Read the changelog, back up, test on staging, validate checkout and customer account, then deploy.",
    "Expired access can limit official updates without removing rights over code already received.",
  ], ["/en/docs/backup-rollback", "/en/docs/releases/1.0.0"]),
  doc("docs.backup-rollback", "backup-rollback", "Backup and rollback", "Prepare a usable backup before installation or update.", "Rollback", [
    "Verify that files and database can be restored together.",
    "Document time, version and checks before touching production.",
  ], ["/en/docs/updates", "/en/docs/troubleshooting"]),
  doc("docs.troubleshooting", "troubleshooting", "Troubleshooting", "Identify common errors and escalate without sharing secrets.", "Safe diagnostics", [
    "Share version, steps, sanitized error message and screenshots without keys, tokens, passwords or customer data.",
    "Separate theme, third-party plugin, hosting, cache/CDN and payment errors.",
  ], ["/en/account/support", "/en/docs/faq"]),
  doc("docs.faq", "faq", "Documentation FAQ", "Common questions about installation, activation, updates and support.", "Short answers", [
    "Answers stay operational and link to legal pages when a commercial rule is involved.",
    "No question should introduce an unapproved promise.",
  ], ["/en/faq", "/en/docs/troubleshooting"]),
  doc("docs.release-1.0.0", "releases/1.0.0", "Release 1.0.0", "Release-note structure for the first customer-ready version.", "Release contract", [
    "The release must provide LICENSE.txt, COPYRIGHT.md, THIRD_PARTY_NOTICES.md, README.md, QUICKSTART.md, INSTALLATION.md, UPGRADE.md, TROUBLESHOOTING.md and CHANGELOG.md.",
    "This repository defines the validation contract; it does not contain the private theme ZIP.",
  ], ["/en/docs/updates", "/en/docs/installation"], "1.0.0"),
] satisfies DocumentationContentDocument[]
