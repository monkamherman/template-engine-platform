import Image from "next/image"
import * as React from "react"

import { cn } from "@/lib/utils"

const conceptSrc = {
  a: "/brand/concepts/concept-a.svg",
  b: "/brand/concepts/concept-b.svg",
  c: "/brand/concepts/concept-c.svg",
} as const

const finalLogoSrc = {
  mark: "/brand/logo-mark.svg",
  horizontal: "/brand/logo-lockup-horizontal.svg",
  stacked: "/brand/logo-lockup-stacked.svg",
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

export function FinalLogoMark({
  className,
  size = 48,
}: {
  className?: string
  size?: number
}) {
  return (
    <Image
      alt="Template Engine logo mark"
      className={cn("h-auto w-auto", className)}
      height={size}
      priority
      src={finalLogoSrc.mark}
      width={size}
    />
  )
}

export function LogoLockup({
  className,
  variant = "horizontal",
}: {
  className?: string
  variant?: "horizontal" | "stacked"
}) {
  const isStacked = variant === "stacked"

  return (
    <Image
      alt="Template Engine Platform logo"
      className={cn("h-auto w-auto", className)}
      height={isStacked ? 180 : 96}
      priority
      src={finalLogoSrc[variant]}
      width={isStacked ? 240 : 420}
    />
  )
}
