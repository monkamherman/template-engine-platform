import Image from "next/image"
import * as React from "react"

import { cn } from "@/lib/utils"

const conceptSrc = {
  a: "/brand/concepts/concept-a.svg",
  b: "/brand/concepts/concept-b.svg",
  c: "/brand/concepts/concept-c.svg",
} as const

export type LogoConcept = keyof typeof conceptSrc

export function LogoMark({
  className,
  concept = "a",
  size = 48,
}: {
  className?: string
  concept?: LogoConcept
  size?: number
}) {
  return (
    <Image
      alt={`Template Engine monogram concept ${concept.toUpperCase()}`}
      className={cn("h-auto w-auto", className)}
      height={size}
      priority
      src={conceptSrc[concept]}
      width={size}
    />
  )
}

export function LogoLockup({
  className,
  concept = "a",
}: {
  className?: string
  concept?: LogoConcept
}) {
  return (
    <div className={cn("inline-flex items-center gap-3 text-brand-ink", className)}>
      <LogoMark concept={concept} size={40} />
      <div className="leading-none">
        <p className="font-heading text-base font-extrabold">Template Engine</p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-slate">
          Platform
        </p>
      </div>
    </div>
  )
}
