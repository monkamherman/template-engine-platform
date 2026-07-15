import prisma from "@/lib/prisma"
import { parseLicenseEnvironment } from "@/modules/licensing"
import { handleLicenseRoute } from "@/modules/licensing/http/protocol"
import { licenseRateLimiter } from "@/modules/licensing/rate-limit/shared"
import { activateLicenseRequestSchema } from "@/modules/licensing/schemas"
import { activateLicense } from "@/modules/licensing/services/protocol-service"
import { makeKeyParts } from "@/modules/licensing/crypto/key-format"
import { LicensingError } from "@/modules/licensing/errors"

export async function POST(request: Request) {
  return handleLicenseRoute(request, activateLicenseRequestSchema, async ({ clientId, input, requestId }) => {
    const limit = await licenseRateLimiter.consume({
      clientId,
      endpoint: "activate",
      installationId: input.installationId,
      licensePrefix: safePrefix(input.licenseKey),
    })
    if (!limit.allowed) throw new LicensingError("SERVICE_UNAVAILABLE")

    return activateLicense({
      env: parseLicenseEnvironment(process.env),
      input,
      prisma,
      requestId,
    })
  })
}

function safePrefix(licenseKey: string) {
  try {
    return makeKeyParts(licenseKey).keyPrefix
  } catch {
    return undefined
  }
}
