import assert from "node:assert/strict"
import test from "node:test"

import { buildPasswordResetEmail, buildVerificationEmail } from "@/modules/auth/email-templates"
import { isPasswordAllowed } from "@/modules/auth/password-policy"

test("password policy requires length and mixed character classes", () => {
  assert.equal(isPasswordAllowed("short"), false)
  assert.equal(isPasswordAllowed("lowercaseonly1!"), false)
  assert.equal(isPasswordAllowed("NoNumberHere!"), false)
  assert.equal(isPasswordAllowed("NoSymbolHere1"), false)
  assert.equal(isPasswordAllowed("ValidPass1!"), true)
})

test("verification email template contains the magic link and expiration without account data", () => {
  const template = buildVerificationEmail({
    locale: "fr",
    link: "https://example.test/fr/verify-email?token=abc",
    expiresInMinutes: 30,
  })

  assert.match(template.subject, /Verifiez/)
  assert.match(template.text, /https:\/\/example.test\/fr\/verify-email/)
  assert.match(template.text, /30/)
  assert.doesNotMatch(template.text, /password|mot de passe/i)
})

test("password reset email template is structurally complete in English", () => {
  const template = buildPasswordResetEmail({
    locale: "en",
    link: "https://example.test/en/reset-password?token=abc",
    expiresInMinutes: 30,
  })

  assert.match(template.subject, /Reset/)
  assert.match(template.text, /https:\/\/example.test\/en\/reset-password/)
  assert.match(template.html, /Reset password/)
})
