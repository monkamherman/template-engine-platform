export type LicenseStatus = "ACTIVE" | "SUSPENDED" | "EXPIRED" | "REVOKED";
export type ActivationStatus = "ACTIVE" | "DEACTIVATED" | "BLOCKED";

export function canValidateLicense(input: {
  status: LicenseStatus;
  expiresAt?: Date | null;
  now?: Date;
}): boolean {
  const now = input.now ?? new Date();

  return input.status === "ACTIVE" && (!input.expiresAt || input.expiresAt > now);
}

export function canActivateLicense(input: {
  status: LicenseStatus;
  activationLimit: number;
  activeActivationCount: number;
  expiresAt?: Date | null;
  now?: Date;
}): boolean {
  return (
    canValidateLicense(input) &&
    input.activationLimit > 0 &&
    input.activeActivationCount < input.activationLimit
  );
}
