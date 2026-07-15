import * as React from "react"

import { Button, type ButtonProps } from "@/components/ui/button"

export interface IconButtonProps extends Omit<ButtonProps, "children"> {
  label: string
  icon: React.ReactNode
}

function IconButton({ icon, label, ...props }: IconButtonProps) {
  return (
    <Button aria-label={label} size="icon" {...props}>
      {icon}
    </Button>
  )
}

export { IconButton }
