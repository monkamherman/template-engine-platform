import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex min-w-[2.5rem] items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-[background,border,color,box-shadow] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange disabled:pointer-events-none disabled:opacity-55 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-orange text-white shadow-subtle hover:bg-brand-orange-strong",
        secondary:
          "bg-brand-ink text-brand-ivory shadow-subtle hover:bg-brand-slate",
        outline:
          "border border-brand-border bg-transparent text-brand-ink hover:border-brand-ink hover:bg-white",
        ghost: "text-brand-slate hover:bg-brand-orange-soft hover:text-brand-ink",
        danger:
          "bg-danger text-white shadow-subtle hover:bg-danger/90",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        compact: "h-9 rounded-sm px-3 text-xs",
        lg: "h-12 rounded-md px-7",
        icon: "h-10 w-10 px-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled,
      isLoading = false,
      variant,
      size,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    if (asChild && !isLoading) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      )
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <Loader2 aria-hidden="true" className="animate-spin" />
        ) : null}
        <span className={cn(isLoading && "opacity-90")}>{children}</span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
