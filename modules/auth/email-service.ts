import "server-only"

import nodemailer from "nodemailer"

import { getAuthEnv } from "@/modules/auth/env"
import type { AuthEmailTemplate } from "@/modules/auth/email-templates"

export type AuthEmailInput = {
  to: string
  template: AuthEmailTemplate
}

export async function sendAuthEmail({ to, template }: AuthEmailInput) {
  const env = getAuthEnv()

  if (env.EMAIL_PROVIDER === "mock") {
    console.info("auth email queued", {
      provider: "mock",
      subject: template.subject,
    })
    return
  }

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD,
    },
  })

  await transporter.sendMail({
    from: env.EMAIL_FROM,
    to,
    replyTo: env.EMAIL_REPLY_TO,
    subject: template.subject,
    text: template.text,
    html: template.html,
  })
}
