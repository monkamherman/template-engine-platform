import "server-only"

import { z } from "zod"

const optionalSecret = z.preprocess((value) => (value === "" ? undefined : value), z.string().min(1).optional())

const authEnvSchema = z.object({
  APP_URL: z.string().url().default("http://localhost:3000"),
  AUTH_SECRET: z.string().min(32),
  AUTH_GOOGLE_ID: optionalSecret,
  AUTH_GOOGLE_SECRET: optionalSecret,
  AUTH_MAGIC_LINK_SECRET: z.string().min(32),
  AUTH_EMAIL_VERIFICATION_TTL_MINUTES: z.coerce.number().int().positive().default(30),
  AUTH_PASSWORD_RESET_TTL_MINUTES: z.coerce.number().int().positive().default(30),
  AUTH_SESSION_MAX_AGE_SECONDS: z.coerce.number().int().positive().default(2592000),
  EMAIL_PROVIDER: z.enum(["mock", "smtp"]).default("mock"),
  EMAIL_FROM: z.string().min(3),
  EMAIL_REPLY_TO: z.preprocess((value) => (value === "" ? undefined : value), z.string().min(3).optional()),
  SMTP_HOST: optionalSecret,
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_USER: optionalSecret,
  SMTP_PASSWORD: optionalSecret,
  SMTP_SECURE: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
})

export type AuthEnv = z.infer<typeof authEnvSchema>

export function getAuthEnv(): AuthEnv {
  const parsed = authEnvSchema.safeParse(process.env)

  if (!parsed.success) {
    throw new Error("Invalid authentication environment configuration")
  }

  if (parsed.data.EMAIL_PROVIDER === "smtp") {
    const missing = [
      ["SMTP_HOST", parsed.data.SMTP_HOST],
      ["SMTP_USER", parsed.data.SMTP_USER],
      ["SMTP_PASSWORD", parsed.data.SMTP_PASSWORD],
    ].filter(([, value]) => !value)

    if (missing.length > 0) {
      throw new Error(`Missing SMTP configuration: ${missing.map(([key]) => key).join(", ")}`)
    }
  }

  return parsed.data
}

export function isGoogleAuthConfigured() {
  return Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET)
}
