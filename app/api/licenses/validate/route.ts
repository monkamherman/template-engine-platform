import prisma from "@/lib/prisma"
import { parseLicenseEnvironment } from "@/modules/licensing"
import { makeKeyParts } from "@/modules/licensing/crypto/key-format"
import { LicensingError } from "@/modules/licensing/errors"
import { handleLicenseRoute } from "@/modules/licensing/http/protocol"
import { licenseRateLimiter } from "@/modules/licensing/rate-limit/shared"
import { validateLicenseRequestSchema } from "@/modules/licensing/schemas"
import { validateLicense } from "@/modules/licensing/services/protocol-service"

export async function POST(request: Request) {
  return handleLicenseRoute(request, validateLicenseRequestSchema, async ({ clientId, input, requestId }) => {
    const limit = await licenseRateLimiter.consume({
      clientId,
      endpoint: "validate",
      installationId: input.installationId,
      licensePrefix: safePrefix(input.licenseKey),
    })
    if (!limit.allowed) throw new LicensingError("SERVICE_UNAVAILABLE")

    return validateLicense({
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
