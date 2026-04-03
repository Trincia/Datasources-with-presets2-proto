import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // DuBois base: 4px radius, regular weight (400), 40% disabled opacity, 13px font
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-normal transition-all disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-[2px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // DuBois primary — blue600, hover blue700, press blue800
        default:
          "bg-primary text-primary-foreground hover:bg-blue-700 active:bg-blue-800",
        // DuBois outline — neutral300 border (cbcbcb), hover turns text+border blue
        outline:
          "border border-input bg-background hover:bg-[var(--action-default-bg-hover)] hover:text-blue-700 hover:border-primary dark:bg-input/30 dark:border-input dark:hover:bg-[var(--action-default-bg-hover)] dark:hover:text-blue-400 dark:hover:border-blue-400",
        // DuBois ghost — transparent, hover turns text blue
        ghost:
          "hover:bg-[var(--action-default-bg-hover)] hover:text-blue-700 dark:hover:bg-[var(--action-default-bg-hover)] dark:hover:text-blue-400",
        // DuBois danger
        destructive:
          "bg-destructive text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // DuBois sizes: 32px sm (standard), 24px xs (compact)
        sm: "h-8 px-3 has-[>svg]:px-2.5",
        xs: "h-6 gap-1 px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "sm",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
