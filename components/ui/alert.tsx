import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "rounded-md border px-4 py-3 text-sm leading-6",
  {
    variants: {
      variant: {
        info: "border-info/20 bg-info-soft text-brand-ink",
        success: "border-success/20 bg-success-soft text-brand-ink",
        warning: "border-warning/20 bg-warning-soft text-brand-ink",
        danger: "border-danger/20 bg-danger-soft text-brand-ink",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

function Alert({ className, variant, ...props }: AlertProps) {
  return (
    <div
      role={variant === "danger" ? "alert" : "status"}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Alert, alertVariants }
