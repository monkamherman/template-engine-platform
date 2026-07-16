import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto"

export type EncryptedLicenseKey = {
  secretCiphertext: string
  secretNonce: string
  secretAuthTag: string
}

export function encryptLicenseKey(canonicalKey: string, key: Buffer): EncryptedLicenseKey {
  assertAesKey(key)
  const nonce = randomBytes(12)
  const cipher = createCipheriv("aes-256-gcm", key, nonce)
  const ciphertext = Buffer.concat([cipher.update(canonicalKey, "utf8"), cipher.final()])
  const authTag = cipher.getAuthTag()

  return {
    secretCiphertext: ciphertext.toString("base64url"),
    secretNonce: nonce.toString("base64url"),
    secretAuthTag: authTag.toString("base64url"),
  }
}

export function decryptLicenseKey(payload: EncryptedLicenseKey, key: Buffer) {
  assertAesKey(key)
  const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(payload.secretNonce, "base64url"))
  decipher.setAuthTag(Buffer.from(payload.secretAuthTag, "base64url"))

  return Buffer.concat([
    decipher.update(Buffer.from(payload.secretCiphertext, "base64url")),
    decipher.final(),
  ]).toString("utf8")
}

function assertAesKey(key: Buffer) {
  if (key.length !== 32) {
    throw new Error("LICENSE_ENCRYPTION_KEY_V1 must decode to 32 bytes.")
  }
}
