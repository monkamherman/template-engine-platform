import Link, { type LinkProps } from "next/link"
import * as React from "react"

import { Button, type ButtonProps } from "@/components/ui/button"

type LinkButtonProps = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  Pick<ButtonProps, "variant" | "size" | "className">

function LinkButton({ className, size, variant, ...props }: LinkButtonProps) {
  return (
    <Button asChild className={className} size={size} variant={variant}>
      <Link {...props} />
    </Button>
  )
}

export { LinkButton }
