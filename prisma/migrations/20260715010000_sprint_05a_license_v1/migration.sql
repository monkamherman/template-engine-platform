CREATE TYPE "LicenseActivationEnvironment" AS ENUM ('PRODUCTION', 'STAGING');

ALTER TABLE "licenses"
  ADD COLUMN "keyLast4" TEXT,
  ADD COLUMN "secretCiphertext" TEXT,
  ADD COLUMN "secretNonce" TEXT,
  ADD COLUMN "secretAuthTag" TEXT,
  ADD COLUMN "encryptionKeyVersion" TEXT,
  ADD COLUMN "hashVersion" TEXT,
  ADD COLUMN "keyVersion" INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN "productionLimit" INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN "stagingLimit" INTEGER NOT NULL DEFAULT 1;

UPDATE "licenses"
SET
  "keyLast4" = RIGHT("keyPrefix", 4),
  "secretCiphertext" = '',
  "secretNonce" = '',
  "secretAuthTag" = '',
  "encryptionKeyVersion" = 'migration-placeholder',
  "hashVersion" = 'v1'
WHERE "keyLast4" IS NULL;

ALTER TABLE "licenses"
  ALTER COLUMN "keyLast4" SET NOT NULL,
  ALTER COLUMN "secretCiphertext" SET NOT NULL,
  ALTER COLUMN "secretNonce" SET NOT NULL,
  ALTER COLUMN "secretAuthTag" SET NOT NULL,
  ALTER COLUMN "encryptionKeyVersion" SET NOT NULL,
  ALTER COLUMN "hashVersion" SET NOT NULL;

ALTER TABLE "licenses"
  DROP COLUMN "activationLimit";

CREATE UNIQUE INDEX "licenses_entitlementId_key" ON "licenses"("entitlementId");
CREATE INDEX "licenses_status_idx" ON "licenses"("status");

ALTER TABLE "licenses"
  ADD CONSTRAINT "licenses_non_negative_limits_check"
  CHECK ("productionLimit" >= 0 AND "stagingLimit" >= 0);

ALTER TABLE "license_activations"
  ADD COLUMN "environment" "LicenseActivationEnvironment" NOT NULL DEFAULT 'PRODUCTION';

CREATE INDEX "license_activations_licenseId_environment_status_idx"
  ON "license_activations"("licenseId", "environment", "status");

-- Rollback note:
-- Restoring the previous schema requires dropping V1 secret storage fields and
-- merging production/staging limits back into a single activationLimit value.
-- That loses environment-specific limits and should not be done after V1 data
-- is issued without a dedicated data migration.
