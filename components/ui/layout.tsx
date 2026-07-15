import * as React from "react"

import { cn } from "@/lib/utils"

function Container({
  className,
  wide = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { wide?: boolean }) {
  return <div className={cn(wide ? "wide-container" : "page-container", className)} {...props} />
}

function Section({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn("py-12 sm:py-16", className)} {...props} />
}

function Stack({
  className,
  gap = "md",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { gap?: "sm" | "md" | "lg" }) {
  return (
    <div
      className={cn(
        "flex flex-col",
        gap === "sm" && "gap-3",
        gap === "md" && "gap-5",
        gap === "lg" && "gap-8",
        className
      )}
      {...props}
    />
  )
}

function Cluster({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-wrap items-center gap-3", className)} {...props} />
}

function Divider({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn("border-brand-border", className)} {...props} />
}

export { Cluster, Container, Divider, Section, Stack }
