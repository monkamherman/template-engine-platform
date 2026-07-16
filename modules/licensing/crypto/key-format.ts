import { randomBytes } from "node:crypto"

import {
  LICENSE_KEY_GROUPS,
  LICENSE_KEY_GROUP_SIZE,
  LICENSE_KEY_PREFIX_MARKER,
  LICENSE_KEY_RANDOM_BYTES,
} from "@/modules/licensing/constants"
import { LicensingError } from "@/modules/licensing/errors"

const CROCKFORD_ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"
const CANONICAL_LENGTH = LICENSE_KEY_PREFIX_MARKER.length + LICENSE_KEY_GROUPS * LICENSE_KEY_GROUP_SIZE
const DISPLAY_PATTERN = /^TEP1(?:-[0-9A-HJKMNP-TV-Z]{4}){8}$/
const CANONICAL_PATTERN = /^TEP1[0-9A-HJKMNP-TV-Z]{32}$/

export type LicenseKeyParts = {
  displayKey: string
  canonicalKey: string
  keyPrefix: string
  keyLast4: string
}

export function generateLicenseKey(random = randomBytes(LICENSE_KEY_RANDOM_BYTES)): LicenseKeyParts {
  if (random.length !== LICENSE_KEY_RANDOM_BYTES) {
    throw new LicensingError("BAD_REQUEST", "License key entropy input must be exactly 20 bytes.")
  }

  const secret = encodeCrockfordBase32(random)
  const canonicalKey = `${LICENSE_KEY_PREFIX_MARKER}${secret}`
  return makeKeyParts(canonicalKey)
}

export function canonicalizeLicenseKey(input: string): string {
  const canonical = input.toUpperCase().replace(/[^0-9A-Z]/g, "")

  if (canonical.length !== CANONICAL_LENGTH || !CANONICAL_PATTERN.test(canonical)) {
    throw new LicensingError("INVALID_LICENSE")
  }

  return canonical
}

export function formatLicenseKey(canonicalKey: string): string {
  const canonical = canonicalizeLicenseKey(canonicalKey)
  const secret = canonical.slice(LICENSE_KEY_PREFIX_MARKER.length)
  const groups = secret.match(new RegExp(`.{1,${LICENSE_KEY_GROUP_SIZE}}`, "g")) ?? []
  const displayKey = `${LICENSE_KEY_PREFIX_MARKER}-${groups.join("-")}`

  if (!DISPLAY_PATTERN.test(displayKey)) {
    throw new LicensingError("INVALID_LICENSE")
  }

  return displayKey
}

export function makeKeyParts(key: string): LicenseKeyParts {
  const canonicalKey = canonicalizeLicenseKey(key)
  const displayKey = formatLicenseKey(canonicalKey)
  const secret = canonicalKey.slice(LICENSE_KEY_PREFIX_MARKER.length)

  return {
    displayKey,
    canonicalKey,
    keyPrefix: `${LICENSE_KEY_PREFIX_MARKER}-${secret.slice(0, 4)}-${secret.slice(4, 8)}`,
    keyLast4: secret.slice(-4),
  }
}

function encodeCrockfordBase32(bytes: Buffer) {
  let value = 0
  let bits = 0
  let output = ""

  for (const byte of bytes) {
    value = (value << 8) | byte
    bits += 8

    while (bits >= 5) {
      output += CROCKFORD_ALPHABET[(value >>> (bits - 5)) & 31]
      bits -= 5
    }
  }

  if (bits > 0) {
    output += CROCKFORD_ALPHABET[(value << (5 - bits)) & 31]
  }

  return output
}
