CREATE TYPE "LegalDocumentType" AS ENUM (
  'SOFTWARE_LICENSE',
  'COMMERCIAL_TERMS',
  'SUPPORT_POLICY',
  'REFUNDS',
  'PRIVACY',
  'TRADEMARK'
);

CREATE TYPE "LegalDocumentStatus" AS ENUM (
  'DRAFT',
  'REVIEW',
  'PUBLISHED',
  'ARCHIVED'
);

CREATE TABLE "legal_documents" (
  "id" TEXT NOT NULL,
  "type" "LegalDocumentType" NOT NULL,
  "slug" TEXT NOT NULL,
  "locale" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "owner" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "legal_documents_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "legal_document_versions" (
  "id" TEXT NOT NULL,
  "documentId" TEXT NOT NULL,
  "version" TEXT NOT NULL,
  "status" "LegalDocumentStatus" NOT NULL DEFAULT 'DRAFT',
  "effectiveAt" TIMESTAMP(3),
  "contentChecksum" TEXT NOT NULL,
  "reviewNotes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "publishedAt" TIMESTAMP(3),
  "archivedAt" TIMESTAMP(3),

  CONSTRAINT "legal_document_versions_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "offer_terms_versions" (
  "id" TEXT NOT NULL,
  "offerId" TEXT NOT NULL,
  "legalDocumentVersionId" TEXT NOT NULL,
  "version" TEXT NOT NULL,
  "status" "LegalDocumentStatus" NOT NULL DEFAULT 'DRAFT',
  "effectiveAt" TIMESTAMP(3),
  "contentChecksum" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "offer_terms_versions_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "customer_acceptances" (
  "id" TEXT NOT NULL,
  "userId" TEXT,
  "orderId" TEXT,
  "legalDocumentVersionId" TEXT NOT NULL,
  "offerTermsVersionId" TEXT,
  "acceptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "acceptanceContext" JSONB,

  CONSTRAINT "customer_acceptances_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "legal_documents_type_locale_key" ON "legal_documents"("type", "locale");
CREATE UNIQUE INDEX "legal_documents_slug_locale_key" ON "legal_documents"("slug", "locale");
CREATE UNIQUE INDEX "legal_document_versions_documentId_version_key" ON "legal_document_versions"("documentId", "version");
CREATE INDEX "legal_document_versions_documentId_status_idx" ON "legal_document_versions"("documentId", "status");
CREATE UNIQUE INDEX "offer_terms_versions_offerId_version_key" ON "offer_terms_versions"("offerId", "version");
CREATE INDEX "offer_terms_versions_offerId_status_idx" ON "offer_terms_versions"("offerId", "status");
CREATE INDEX "customer_acceptances_userId_acceptedAt_idx" ON "customer_acceptances"("userId", "acceptedAt");
CREATE INDEX "customer_acceptances_orderId_idx" ON "customer_acceptances"("orderId");

ALTER TABLE "legal_document_versions"
  ADD CONSTRAINT "legal_document_versions_documentId_fkey"
  FOREIGN KEY ("documentId") REFERENCES "legal_documents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "offer_terms_versions"
  ADD CONSTRAINT "offer_terms_versions_offerId_fkey"
  FOREIGN KEY ("offerId") REFERENCES "offers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "offer_terms_versions"
  ADD CONSTRAINT "offer_terms_versions_legalDocumentVersionId_fkey"
  FOREIGN KEY ("legalDocumentVersionId") REFERENCES "legal_document_versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "customer_acceptances"
  ADD CONSTRAINT "customer_acceptances_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "customer_acceptances"
  ADD CONSTRAINT "customer_acceptances_orderId_fkey"
  FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "customer_acceptances"
  ADD CONSTRAINT "customer_acceptances_legalDocumentVersionId_fkey"
  FOREIGN KEY ("legalDocumentVersionId") REFERENCES "legal_document_versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "customer_acceptances"
  ADD CONSTRAINT "customer_acceptances_offerTermsVersionId_fkey"
  FOREIGN KEY ("offerTermsVersionId") REFERENCES "offer_terms_versions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
