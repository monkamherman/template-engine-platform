import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  APP_URL: z.string().url(),
  DATABASE_URL: z.string().min(1),
  AUTH_SECRET: z.string().min(24),
  LICENSE_KEY_PEPPER: z.string().min(24),
  DOWNLOAD_SIGNING_SECRET: z.string().min(24),
  PAYMENT_PROVIDER: z.string().default("mock"),
  PAYMENT_WEBHOOK_SECRET: z.string().min(24),
  EMAIL_PROVIDER: z.string().default("mock"),
  EMAIL_FROM: z.string().email(),
  STORAGE_PROVIDER: z.string().default("mock"),
  STORAGE_BUCKET: z.string().min(1),
  STORAGE_ENDPOINT: z.string().url(),
  STORAGE_ACCESS_KEY_ID: z.string().min(1),
  STORAGE_SECRET_ACCESS_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);
