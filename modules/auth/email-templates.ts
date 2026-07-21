import type { Locale } from "@/src/i18n/locales"

export type AuthEmailTemplate = {
  subject: string
  text: string
  html: string
}

const productName = "Template Engine Platform"

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function buildTemplate({
  title,
  intro,
  buttonLabel,
  link,
  expiresLabel,
}: {
  title: string
  intro: string
  buttonLabel: string
  link: string
  expiresLabel: string
}): AuthEmailTemplate {
  const safeLink = escapeHtml(link)
  const safeTitle = escapeHtml(title)
  const safeIntro = escapeHtml(intro)
  const safeButton = escapeHtml(buttonLabel)
  const safeExpires = escapeHtml(expiresLabel)

  return {
    subject: title,
    text: `${title}\n\n${intro}\n\n${buttonLabel}: ${link}\n\n${expiresLabel}\n\n${productName}`,
    html: [
      "<!doctype html>",
      '<html lang="fr">',
      "<body>",
      `<h1>${safeTitle}</h1>`,
      `<p>${safeIntro}</p>`,
      `<p><a href="${safeLink}">${safeButton}</a></p>`,
      `<p>${safeExpires}</p>`,
      `<p>${productName}</p>`,
      "</body>",
      "</html>",
    ].join(""),
  }
}

export function buildVerificationEmail(input: {
  locale: Locale
  link: string
  expiresInMinutes: number
}): AuthEmailTemplate {
  if (input.locale === "en") {
    return buildTemplate({
      title: "Verify your email address",
      intro: "Open this secure magic link to verify your customer account email address.",
      buttonLabel: "Verify email",
      link: input.link,
      expiresLabel: `This link expires in ${input.expiresInMinutes} minutes.`,
    })
  }

  return buildTemplate({
    title: "Verifiez votre adresse email",
    intro: "Ouvrez ce magic link securise pour verifier l'adresse email de votre compte client.",
    buttonLabel: "Verifier l'email",
    link: input.link,
    expiresLabel: `Ce lien expire dans ${input.expiresInMinutes} minutes.`,
  })
}

export function buildPasswordResetEmail(input: {
  locale: Locale
  link: string
  expiresInMinutes: number
}): AuthEmailTemplate {
  if (input.locale === "en") {
    return buildTemplate({
      title: "Reset your password",
      intro: "Open this secure magic link to choose a new password for your customer account.",
      buttonLabel: "Reset password",
      link: input.link,
      expiresLabel: `This link expires in ${input.expiresInMinutes} minutes.`,
    })
  }

  return buildTemplate({
    title: "Reinitialisez votre mot de passe",
    intro: "Ouvrez ce magic link securise pour choisir un nouveau mot de passe client.",
    buttonLabel: "Reinitialiser le mot de passe",
    link: input.link,
    expiresLabel: `Ce lien expire dans ${input.expiresInMinutes} minutes.`,
  })
}
