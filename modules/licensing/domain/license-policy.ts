import type { LicenseActivationEnvironment } from "@/modules/licensing/types"

export function isActivationLimitReached({
  activeCount,
  environment,
  productionLimit,
  stagingLimit,
}: {
  activeCount: number
  environment: LicenseActivationEnvironment
  productionLimit: number
  stagingLimit: number
}) {
  const limit = environment === "PRODUCTION" ? productionLimit : stagingLimit
  return activeCount >= limit
}
