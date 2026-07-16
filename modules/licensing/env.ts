import { z } from "zod"

const licenseEnvSchema = z.object({
  LICENSE_HASH_PEPPER_V1: z.string().min(32),
  LICENSE_ENCRYPTION_KEY_V1: z.string().transform((value, ctx) => {
    const key = Buffer.from(value, "base64url")
    if (key.length !== 32) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "LICENSE_ENCRYPTION_KEY_V1 must be base64url-encoded 32-byte key material.",
      })
      return z.NEVER
    }

    return key
  }),
  LICENSE_SIGNING_PRIVATE_KEY_PEM: z.string().min(1),
  LICENSE_SIGNING_PUBLIC_KEY_PEM: z.string().min(1),
  LICENSE_SIGNING_KEY_ID: z.string().min(1),
  LICENSE_LEASE_TTL_SECONDS: z.coerce.number().int().positive(),
  LICENSE_GRACE_PERIOD_SECONDS: z.coerce.number().int().nonnegative(),
  LICENSE_RATE_LIMIT_MODE: z.enum(["memory", "external"]),
})

export type LicenseEnvironment = z.infer<typeof licenseEnvSchema>

export function parseLicenseEnvironment(env: NodeJS.ProcessEnv): LicenseEnvironment {
  return licenseEnvSchema.parse(env)
}
