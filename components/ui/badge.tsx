import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2.5 py-1 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-brand-ink text-brand-ivory",
        orange:
          "border-transparent bg-brand-orange-soft text-brand-orange-strong",
        secondary:
          "border-brand-border bg-white text-brand-slate",
        destructive:
          "border-transparent bg-danger-soft text-danger",
        success:
          "border-transparent bg-[#e7f6ef] text-success",
        outline: "border-brand-border text-brand-ink",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
