"use client"

import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export function AuthSubmitButton({
  label,
  pendingLabel,
  variant = "primary",
}: {
  label: string
  pendingLabel: string
  variant?: "primary" | "outline"
}) {
  const { pending } = useFormStatus()

  return (
    <Button
      className={
        variant === "outline"
          ? "w-full border-marketing-border text-marketing-foreground hover:bg-marketing-card-subtle"
          : "w-full bg-marketing-accent text-white hover:bg-brand-orange-dark"
      }
      disabled={pending}
      type="submit"
      variant={variant}
    >
      {pending ? <Loader2 aria-hidden="true" className="mr-2 size-4 animate-spin" /> : null}
      {pending ? pendingLabel : label}
    </Button>
  )
}
