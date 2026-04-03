import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  // DuBois: full border (light tinted), tinted background, 4px radius
  // DuBois: padding 11px 12px (LARGE_SIZE_PADDING=12px, minus 1px border for vertical); gap-x-2=8px matches theme.spacing.sm (icon-to-text gap)
  "relative w-full rounded border px-3 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-2 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        info:
          "border-[var(--border-info)] bg-[var(--background-info)] text-primary [&>svg]:text-primary",
        destructive:
          "border-[var(--border-danger)] bg-[var(--background-danger)] text-destructive [&>svg]:text-destructive",
        warning:
          "border-[var(--border-warning)] bg-[var(--background-warning)] text-[var(--warning)] [&>svg]:text-[var(--warning)]",
        success:
          "border-[var(--border-success)] bg-[var(--background-success)] text-[var(--success)] [&>svg]:text-[var(--success)]",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 font-semibold",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
