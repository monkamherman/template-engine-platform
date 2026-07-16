import { domainToASCII } from "node:url"

import { LicensingError } from "@/modules/licensing/errors"

export function normalizeActivationDomain(siteUrl: string) {
  let parsed: URL

  try {
    parsed = new URL(siteUrl)
  } catch {
    throw new LicensingError("BAD_REQUEST", "Invalid site URL.")
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new LicensingError("BAD_REQUEST", "Only http and https site URLs are supported.")
  }

  const asciiHost = domainToASCII(parsed.hostname.toLowerCase().replace(/\.$/, ""))
  if (!asciiHost) {
    throw new LicensingError("BAD_REQUEST", "Invalid site host.")
  }

  const defaultPort = (parsed.protocol === "https:" && parsed.port === "443") || (parsed.protocol === "http:" && parsed.port === "80")
  return parsed.port && !defaultPort ? `${asciiHost}:${parsed.port}` : asciiHost
}
