export type EntitlementStatus = "ACTIVE" | "SUSPENDED" | "EXPIRED" | "REVOKED";
export type ReleaseStatus = "DRAFT" | "PUBLISHED" | "DISABLED";
export type ReleaseFileStatus = "ACTIVE" | "DISABLED";

export function canAccessRelease(input: {
  entitlementStatus: EntitlementStatus;
  entitlementEndsAt?: Date | null;
  releaseStatus: ReleaseStatus;
  releaseFileStatus: ReleaseFileStatus;
  now?: Date;
}): boolean {
  const now = input.now ?? new Date();

  return (
    input.entitlementStatus === "ACTIVE" &&
    (!input.entitlementEndsAt || input.entitlementEndsAt > now) &&
    input.releaseStatus === "PUBLISHED" &&
    input.releaseFileStatus === "ACTIVE"
  );
}
