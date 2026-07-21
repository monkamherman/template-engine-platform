ALTER TABLE "users"
  ADD COLUMN "image" TEXT;

CREATE TABLE "accounts" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  "refresh_token" TEXT,
  "access_token" TEXT,
  "expires_at" INTEGER,
  "token_type" TEXT,
  "scope" TEXT,
  "id_token" TEXT,
  "session_state" TEXT,
  CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "sessions" (
  "id" TEXT NOT NULL,
  "sessionToken" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "expires" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "verification_tokens" (
  "identifier" TEXT NOT NULL,
  "token" TEXT NOT NULL,
  "expires" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "password_credentials" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "password_credentials_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "auth_magic_link_tokens" (
  "id" TEXT NOT NULL,
  "userId" TEXT,
  "email" TEXT NOT NULL,
  "purpose" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "consumedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "auth_magic_link_tokens_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key"
  ON "accounts"("provider", "providerAccountId");
CREATE INDEX "accounts_userId_idx" ON "accounts"("userId");

CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");

CREATE UNIQUE INDEX "verification_tokens_identifier_token_key"
  ON "verification_tokens"("identifier", "token");

CREATE UNIQUE INDEX "password_credentials_userId_key"
  ON "password_credentials"("userId");

CREATE UNIQUE INDEX "auth_magic_link_tokens_purpose_tokenHash_key"
  ON "auth_magic_link_tokens"("purpose", "tokenHash");
CREATE INDEX "auth_magic_link_tokens_email_purpose_expiresAt_idx"
  ON "auth_magic_link_tokens"("email", "purpose", "expiresAt");
CREATE INDEX "auth_magic_link_tokens_userId_purpose_idx"
  ON "auth_magic_link_tokens"("userId", "purpose");

ALTER TABLE "accounts"
  ADD CONSTRAINT "accounts_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "sessions"
  ADD CONSTRAINT "sessions_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "password_credentials"
  ADD CONSTRAINT "password_credentials_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "auth_magic_link_tokens"
  ADD CONSTRAINT "auth_magic_link_tokens_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
