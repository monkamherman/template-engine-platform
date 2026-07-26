import type { MetadataRoute } from "next"

import {
  absoluteUrl,
  getDocumentationSitemapMetadata,
  getLegalSitemapMetadata,
  listPublicSeoPaths,
} from "@/config/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  return listPublicSeoPaths().map((path) => {
    const lastReviewedAt = getDocumentationSitemapMetadata(path) ?? getLegalSitemapMetadata(path)

    return {
      url: absoluteUrl(path),
      lastModified: lastReviewedAt ? new Date(lastReviewedAt) : undefined,
      changeFrequency: path.includes("/docs") || path.includes("/legal") ? "weekly" : "monthly",
      priority: getPriority(path),
    }
  })
}

function getPriority(path: string) {
  if (/^\/(fr|en)$/.test(path)) return 1
  if (path.endsWith("/pricing") || path.endsWith("/product")) return 0.9
  if (path.includes("/docs")) return 0.8
  if (path.includes("/legal")) return 0.4
  return 0.7
}
