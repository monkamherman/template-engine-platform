export const requiredReleasePackageFiles = [
  "LICENSE.txt",
  "COPYRIGHT.md",
  "THIRD_PARTY_NOTICES.md",
  "README.md",
  "QUICKSTART.md",
  "INSTALLATION.md",
  "UPGRADE.md",
  "TROUBLESHOOTING.md",
  "CHANGELOG.md",
] as const

export type ThirdPartyNoticeEntry = {
  name: string
  version: string
  sourceRef: string
  licenseIdentifier: string
  includedInDistribution: boolean
  noticeRequirement: string
  reviewStatus: "PENDING_REVIEW" | "APPROVED" | "BLOCKED" | "REPLACED"
  blockingNote?: string
}

export function validateReleasePackageManifest(files: string[]) {
  const provided = new Set(files)
  return requiredReleasePackageFiles.filter((file) => !provided.has(file))
}

export function hasUnapprovedThirdPartyNotices(entries: ThirdPartyNoticeEntry[]) {
  return entries.some((entry) => entry.reviewStatus !== "APPROVED")
}
