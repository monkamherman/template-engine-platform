import { randomUUID } from "node:crypto"
import { ZodError, type ZodSchema } from "zod"

import { licenseProtocolHeader } from "@/modules/licensing/schemas"
import { LicensingError } from "@/modules/licensing/errors"

const MAX_LICENSE_BODY_BYTES = 16_384

export type LicenseRouteContext<TInput> = {
  input: TInput
  requestId: string
  clientId: string
}

export async function handleLicenseRoute<TInput>(
  request: Request,
  schema: ZodSchema<TInput>,
  handler: (context: LicenseRouteContext<TInput>) => Promise<unknown>,
) {
  const requestId = request.headers.get("x-request-id") ?? `req_${randomUUID()}`

  try {
    assertProtocol(request)
    const input = schema.parse(await readBoundedJson(request))
    const data = await handler({
      input,
      requestId,
      clientId: getClientId(request),
    })

    return jsonResponse(
      {
        ok: true,
        protocolVersion: 1,
        requestId,
        data,
      },
      200,
    )
  } catch (error) {
    return mapError(error, requestId)
  }
}

function assertProtocol(request: Request) {
  const protocol = request.headers.get("x-tep-protocol")
  if (protocol !== licenseProtocolHeader) {
    throw new LicensingError("BAD_REQUEST", "Unsupported protocol.")
  }
}

async function readBoundedJson(request: Request) {
  const text = await request.text()
  if (Buffer.byteLength(text, "utf8") > MAX_LICENSE_BODY_BYTES) {
    throw new LicensingError("BAD_REQUEST", "Request body is too large.")
  }

  try {
    return JSON.parse(text) as unknown
  } catch {
    throw new LicensingError("BAD_REQUEST", "Malformed JSON.")
  }
}

function getClientId(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local"
}

function mapError(error: unknown, requestId: string) {
  if (error instanceof ZodError) {
    return errorResponse(requestId, "BAD_REQUEST", "The request body is invalid.", false, 400)
  }

  if (error instanceof LicensingError) {
    const status = errorStatus(error.code)
    const publicCode = error.code === "BAD_REQUEST" ? "BAD_REQUEST" : error.code
    return errorResponse(requestId, publicCode, publicMessage(publicCode), isRetryable(status), status)
  }

  return errorResponse(requestId, "INTERNAL_ERROR", "The license service could not complete the request.", true, 500)
}

function errorStatus(code: LicensingError["code"]) {
  switch (code) {
    case "BAD_REQUEST":
      return 400
    case "INVALID_LICENSE":
      return 401
    case "PRODUCT_MISMATCH":
      return 403
    case "DOMAIN_MISMATCH":
    case "PRODUCTION_LIMIT_REACHED":
    case "STAGING_LIMIT_REACHED":
      return 409
    case "SERVICE_UNAVAILABLE":
      return 503
    default:
      return 500
  }
}

function publicMessage(code: string) {
  if (code === "RATE_LIMITED") return "Too many license requests."
  if (code === "SERVICE_UNAVAILABLE") return "The license service is temporarily unavailable."
  if (code === "BAD_REQUEST") return "The license request is invalid."
  return "The license could not be validated."
}

function isRetryable(status: number) {
  return status === 429 || status === 503 || status >= 500
}

function errorResponse(requestId: string, code: string, message: string, retryable: boolean, status: number) {
  return jsonResponse(
    {
      ok: false,
      protocolVersion: 1,
      requestId,
      error: {
        code,
        message,
        retryable,
      },
    },
    status,
  )
}

function jsonResponse(body: unknown, status: number) {
  return Response.json(body, {
    status,
    headers: {
      "X-TEP-Protocol": licenseProtocolHeader,
    },
  })
}
