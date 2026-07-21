"use server"

import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

import { signIn } from "@/auth"
import {
  consumeVerificationMagicLink,
  registerCustomerWithPassword,
  resetPasswordWithMagicLink,
  sendPasswordResetMagicLink,
  sendVerificationMagicLink,
  normalizeEmail,
} from "@/modules/auth/account-service"
import { isPasswordAllowed } from "@/modules/auth/password-policy"
import { prisma } from "@/lib/prisma"
import type { Locale } from "@/src/i18n/locales"

function formString(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" ? value : ""
}

function formLocale(formData: FormData): Locale {
  return formString(formData, "locale") === "en" ? "en" : "fr"
}

function localizedAuthPath(locale: Locale, path: string, params?: Record<string, string>) {
  const search = new URLSearchParams(params)
  const query = search.size > 0 ? `?${search.toString()}` : ""
  return `/${locale}/${path}${query}`
}

export async function signInWithGoogleAction(formData: FormData) {
  const locale = formLocale(formData)
  await signIn("google", { redirectTo: `/${locale}/account` })
}

export async function signInWithPasswordAction(formData: FormData) {
  const locale = formLocale(formData)
  const email = formString(formData, "email")
  const password = formString(formData, "password")

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: `/${locale}/account`,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      redirect(localizedAuthPath(locale, "login", { status: "invalid" }))
    }

    throw error
  }
}

export async function registerWithPasswordAction(formData: FormData) {
  const locale = formLocale(formData)
  const email = formString(formData, "email")
  const name = formString(formData, "name")
  const password = formString(formData, "password")
  const confirmPassword = formString(formData, "confirmPassword")

  if (password !== confirmPassword || !isPasswordAllowed(password)) {
    redirect(localizedAuthPath(locale, "register", { status: "invalid-password" }))
  }

  await registerCustomerWithPassword({
    email,
    name,
    password,
    locale,
  })

  redirect(localizedAuthPath(locale, "verify-email", { status: "sent" }))
}

export async function requestPasswordResetAction(formData: FormData) {
  const locale = formLocale(formData)
  const email = formString(formData, "email")

  await sendPasswordResetMagicLink({ email, locale })

  redirect(localizedAuthPath(locale, "forgot-password", { status: "sent" }))
}

export async function resetPasswordAction(formData: FormData) {
  const locale = formLocale(formData)
  const email = formString(formData, "email")
  const token = formString(formData, "token")
  const password = formString(formData, "password")
  const confirmPassword = formString(formData, "confirmPassword")

  if (password !== confirmPassword || !isPasswordAllowed(password)) {
    redirect(localizedAuthPath(locale, "reset-password", { status: "invalid-password", email, token }))
  }

  const result = await resetPasswordWithMagicLink({ email, token, password })

  if (result !== "verified") {
    redirect(localizedAuthPath(locale, "reset-password", { status: result }))
  }

  redirect(localizedAuthPath(locale, "login", { status: "password-updated" }))
}

export async function resendVerificationAction(formData: FormData) {
  const locale = formLocale(formData)
  const email = normalizeEmail(formString(formData, "email"))
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, emailVerified: true, status: true },
  })

  if (user && !user.emailVerified && user.status === "ACTIVE") {
    await sendVerificationMagicLink({ userId: user.id, email: user.email, locale })
  }

  redirect(localizedAuthPath(locale, "verify-email", { status: "sent" }))
}

export async function verifyEmailTokenFromSearchParams(input: {
  email?: string
  token?: string
}) {
  if (!input.email || !input.token) {
    return undefined
  }

  return consumeVerificationMagicLink({
    email: input.email,
    token: input.token,
  })
}
