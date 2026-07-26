import type { MetadataRoute } from "next"

import { absoluteUrl, getSiteUrl } from "@/config/seo"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/fr/account/",
        "/en/account/",
        "/fr/admin/",
        "/en/admin/",
        "/fr/checkout/",
        "/en/checkout/",
        "/fr/dev/",
        "/en/dev/",
      ],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: getSiteUrl().origin,
  }
}
