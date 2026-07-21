import "server-only"

import crypto from "node:crypto"

import { Role } from "@prisma/client"
import { compare, hash } from "bcryptjs"

import { prisma } from "@/lib/prisma"
import { getAuthEnv } from "@/modules/auth/env"
import { buildPasswordResetEmail, buildVerificationEmail } from "@/modules/auth/email-templates"
import { sendAuthEmail } from "@/modules/auth/email-service"
import { isPasswordAllowed } from "@/modules/auth/password-policy"
import type { Locale } from "@/src/i18n/locales"

export type MagicLinkPurpose = "verify-email" | "reset-password"
export type MagicLinkResult = "verified" | "expired" | "invalid"

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

export async function verifyPasswordForCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email: normalizeEmail(email) },
    include: { password: true },
  })

  if (!user || !user.password || !user.emailVerified || user.status !== "ACTIVE") {
    return null
  }

  const passwordMatches = await compare(password, user.password.passwordHash)

  if (!passwordMatches) {
    return null
  }

  return user
}

export async function registerCustomerWithPassword(input: {
  email: string
  name?: string
  password: string
  locale: Locale
}) {
  const email = normalizeEmail(input.email)

  if (!email || !isPasswordAllowed(input.password)) {
    return
  }

  const passwordHash = await hash(input.password, 12)

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      name: input.name?.trim() || undefined,
      preferredLocale: input.locale,
    },
    create: {
      email,
      name: input.name?.trim() || undefined,
      preferredLocale: input.locale,
      roles: {
        create: { role: Role.CUSTOMER },
      },
      password: {
        create: { passwordHash },
      },
    },
    include: { password: true },
  })

  await ensureCustomerRole(user.id)

  if (!user.password) {
    await prisma.passwordCredential.create({
      data: {
        userId: user.id,
        passwordHash,
      },
    })
  }

  if (!user.emailVerified) {
    await sendVerificationMagicLink({ userId: user.id, email, locale: input.locale })
  }
}

export async function sendPasswordResetMagicLink(input: { email: string; locale: Locale }) {
  const email = normalizeEmail(input.email)
  const user = await prisma.user.findUnique({
    where: { email },
    include: { password: true },
  })

  if (!user || !user.password || user.status !== "ACTIVE") {
    return
  }

  await createAndSendMagicLink({
    purpose: "reset-password",
    userId: user.id,
    email,
    locale: input.locale,
    ttlMinutes: getAuthEnv().AUTH_PASSWORD_RESET_TTL_MINUTES,
  })
}

export async function sendVerificationMagicLink(input: {
  userId: string
  email: string
  locale: Locale
}) {
  await createAndSendMagicLink({
    purpose: "verify-email",
    userId: input.userId,
    email: normalizeEmail(input.email),
    locale: input.locale,
    ttlMinutes: getAuthEnv().AUTH_EMAIL_VERIFICATION_TTL_MINUTES,
  })
}

export async function consumeVerificationMagicLink(input: { email: string; token: string }) {
  const result = await consumeMagicLink({
    email: input.email,
    token: input.token,
    purpose: "verify-email",
  })

  if (result !== "verified") {
    return result
  }

  await prisma.user.update({
    where: { email: normalizeEmail(input.email) },
    data: { emailVerified: new Date() },
  })

  return result
}

export async function resetPasswordWithMagicLink(input: {
  email: string
  token: string
  password: string
}) {
  if (!isPasswordAllowed(input.password)) {
    return "invalid" as const
  }

  const result = await consumeMagicLink({
    email: input.email,
    token: input.token,
    purpose: "reset-password",
  })

  if (result !== "verified") {
    return result
  }

  const user = await prisma.user.findUnique({ where: { email: normalizeEmail(input.email) } })

  if (!user) {
    return "invalid" as const
  }

  const passwordHash = await hash(input.password, 12)

  await prisma.passwordCredential.upsert({
    where: { userId: user.id },
    update: { passwordHash },
    create: { userId: user.id, passwordHash },
  })

  return "verified" as const
}

async function createAndSendMagicLink(input: {
  purpose: MagicLinkPurpose
  userId: string
  email: string
  locale: Locale
  ttlMinutes: number
}) {
  const env = getAuthEnv()
  const token = crypto.randomBytes(32).toString("base64url")
  const tokenHash = hashMagicLinkToken(token)
  const expiresAt = new Date(Date.now() + input.ttlMinutes * 60 * 1000)
  const path = input.purpose === "verify-email" ? "verify-email" : "reset-password"
  const link = new URL(`/${input.locale}/${path}`, env.APP_URL)

  link.searchParams.set("email", input.email)
  link.searchParams.set("token", token)

  await prisma.authMagicLinkToken.create({
    data: {
      userId: input.userId,
      email: input.email,
      purpose: input.purpose,
      tokenHash,
      expiresAt,
    },
  })

  await sendAuthEmail({
    to: input.email,
    template:
      input.purpose === "verify-email"
        ? buildVerificationEmail({ locale: input.locale, link: link.toString(), expiresInMinutes: input.ttlMinutes })
        : buildPasswordResetEmail({ locale: input.locale, link: link.toString(), expiresInMinutes: input.ttlMinutes }),
  })
}

async function consumeMagicLink(input: {
  email: string
  token: string
  purpose: MagicLinkPurpose
}): Promise<MagicLinkResult> {
  const email = normalizeEmail(input.email)
  const tokenHash = hashMagicLinkToken(input.token)
  const now = new Date()
  const record = await prisma.authMagicLinkToken.findUnique({
    where: {
      purpose_tokenHash: {
        purpose: input.purpose,
        tokenHash,
      },
    },
  })

  if (!record || record.email !== email || record.consumedAt) {
    return "invalid"
  }

  if (record.expiresAt <= now) {
    return "expired"
  }

  await prisma.authMagicLinkToken.update({
    where: { id: record.id },
    data: { consumedAt: now },
  })

  return "verified"
}

function hashMagicLinkToken(token: string) {
  return crypto.createHmac("sha256", getAuthEnv().AUTH_MAGIC_LINK_SECRET).update(token).digest("base64url")
}

async function ensureCustomerRole(userId: string) {
  await prisma.userRole.upsert({
    where: {
      userId_role: {
        userId,
        role: Role.CUSTOMER,
      },
    },
    update: {},
    create: {
      userId,
      role: Role.CUSTOMER,
    },
  })
}
