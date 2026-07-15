import * as React from "react"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  htmlFor: string
  label: string
  error?: string
  hint?: string
}

function FormField({
  children,
  className,
  error,
  hint,
  htmlFor,
  label,
  ...props
}: FormFieldProps) {
  return (
    <div className={cn("grid gap-2", className)} {...props}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint ? <p className="text-sm text-brand-slate">{hint}</p> : null}
      {error ? <p className="text-sm font-medium text-danger">{error}</p> : null}
    </div>
  )
}

export { FormField }
