import { NextResponse } from "next/server"
import { z } from "zod"

import { buildDocumentationDownload } from "@/modules/content/document-downloads"

const docsDownloadQuerySchema = z.object({
  locale: z.enum(["fr", "en"]),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9][a-z0-9/-]*$/i)
    .optional(),
})

export async function GET(request: Request) {
  const url = new URL(request.url)
  const parsed = docsDownloadQuerySchema.safeParse({
    locale: url.searchParams.get("locale"),
    slug: url.searchParams.get("slug") ?? undefined,
  })

  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_docs_download_query" }, { status: 400 })
  }

  const download = buildDocumentationDownload(parsed.data.locale, parsed.data.slug)

  if (!download) {
    return NextResponse.json({ error: "documentation_not_found" }, { status: 404 })
  }

  return new Response(download.body, {
    headers: {
      "Cache-Control": "public, max-age=300",
      "Content-Disposition": `attachment; filename="${download.filename}"`,
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Documentation-Document-Count": String(download.documentCount),
    },
  })
}
