import type { Locale } from "@/src/i18n/locales"

export type ReviewStatus = "DRAFT" | "TECH_REVIEW" | "PRODUCT_REVIEW" | "LEGAL_REVIEW" | "APPROVED" | "PUBLISHED" | "ARCHIVED"
export type ContentVisibility = "public" | "internal"

export type ContentSection = {
  id: string
  title: string
  body: string[]
}

export type LegalContentDocument = {
  id: string
  slug: string
  locale: Locale
  title: string
  summary: string
  documentType: "SOFTWARE_LICENSE" | "COMMERCIAL_TERMS" | "SUPPORT_POLICY" | "REFUNDS" | "PRIVACY" | "TRADEMARK"
  version: string
  effectiveDate: string | null
  lastReviewedAt: string
  reviewStatus: ReviewStatus
  visibility: ContentVisibility
  owner: string
  sections: ContentSection[]
  relatedLinks: string[]
}

export type DocumentationContentDocument = {
  id: string
  slug: string
  locale: Locale
  title: string
  summary: string
  productVersionRange: string
  releaseVersion?: string
  lastReviewedAt: string
  reviewStatus: ReviewStatus
  visibility: ContentVisibility
  owner: string
  sections: ContentSection[]
  relatedLinks: string[]
}
