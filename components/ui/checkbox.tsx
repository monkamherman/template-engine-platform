import * as React from "react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "size-5 rounded-sm border border-brand-border accent-brand-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...props}
      type="checkbox"
    />
  )
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
