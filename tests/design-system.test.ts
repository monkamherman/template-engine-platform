import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { access } from "node:fs/promises"
import test from "node:test"

import { buttonVariants } from "../components/ui/button"
import { isLocale, supportedLocales } from "../src/i18n/locales"

const conceptFiles = [
  "public/brand/concepts/concept-a.svg",
  "public/brand/concepts/concept-b.svg",
  "public/brand/concepts/concept-c.svg",
]

const finalLogoFiles = [
  "public/brand/logo-mark.svg",
  "public/brand/logo-lockup-horizontal.svg",
  "public/brand/logo-lockup-stacked.svg",
  "public/brand/logo-mark-white.svg",
  "public/brand/logo-mark-black.svg",
  "public/brand/favicon.svg",
]

test("supports only fr and en locales", () => {
  assert.deepEqual([...supportedLocales], ["fr", "en"])
  assert.equal(isLocale("fr"), true)
  assert.equal(isLocale("en"), true)
  assert.equal(isLocale("de"), false)
})

test("logo concepts are vector svg assets without embedded bitmaps", async () => {
  for (const file of conceptFiles) {
    await access(file)
    const svg = readFileSync(file, "utf8")

    assert.match(svg, /<svg/)
    assert.match(svg, /viewBox="0 0 96 96"/)
    assert.doesNotMatch(svg, /<image/i)
    assert.doesNotMatch(svg, /base64/i)
  }
})

test("final selected logo assets exist as clean svg files", async () => {
  for (const file of finalLogoFiles) {
    await access(file)
    const svg = readFileSync(file, "utf8")

    assert.match(svg, /<svg/)
    assert.doesNotMatch(svg, /<image/i)
    assert.doesNotMatch(svg, /base64/i)
  }
})

test("brand guidelines document final concept A decision", () => {
  const guidelines = readFileSync("docs/brand-guidelines.md", "utf8")

  assert.match(guidelines, /Concept A/)
  assert.match(guidelines, /Monoline continu/)
  assert.match(guidelines, /24 px minimum/)
})

test("button variants expose required Sprint 02 states", () => {
  assert.match(buttonVariants({ variant: "primary" }), /bg-brand-orange/)
  assert.match(buttonVariants({ variant: "secondary" }), /bg-brand-ink/)
  assert.match(buttonVariants({ variant: "outline" }), /border-brand-border/)
  assert.match(buttonVariants({ variant: "ghost" }), /hover:bg-brand-orange-soft/)
  assert.match(buttonVariants({ variant: "danger" }), /bg-danger/)
  assert.match(buttonVariants({ size: "compact" }), /h-9/)
})

test("design system route source includes core validation sections", () => {
  const source = readFileSync("app/[locale]/design-system/page.tsx", "utf8")

  assert.match(source, /Logo concepts/)
  assert.match(source, /Palette/)
  assert.match(source, /Typography/)
  assert.match(source, /Buttons and states/)
  assert.match(source, /Forms/)
})
