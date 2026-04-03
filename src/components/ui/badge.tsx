import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  // DuBois: rectangular (rounded not rounded-full), regular weight (400), 12px font
  "inline-flex items-center justify-center rounded border border-transparent px-2 py-0.5 text-xs font-normal w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-[2px] transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        // DuBois secondary palette — production exact RGBA tokens (light+dark via CSS vars)
        default_tag: "bg-[var(--tag-bg-default)] text-[var(--tag-text-default)]",
        charcoal:  "bg-[var(--tag-bg-charcoal)] text-[var(--tag-text-charcoal)]",
        coral:     "bg-[var(--tag-bg-coral)] text-[var(--tag-text-coral)]",
        brown:     "bg-[var(--tag-bg-brown)] text-[var(--tag-text-brown)]",
        indigo:    "bg-[var(--tag-bg-indigo)] text-[var(--tag-text-indigo)]",
        lemon:     "bg-[var(--tag-bg-lemon)] text-[var(--tag-text-lemon)]",
        lime:      "bg-[var(--tag-bg-lime)] text-[var(--tag-text-lime)]",
        pink:      "bg-[var(--tag-bg-pink)] text-[var(--tag-text-pink)]",
        purple:    "bg-[var(--tag-bg-purple)] text-[var(--tag-text-purple)]",
        teal:      "bg-[var(--tag-bg-teal)] text-[var(--tag-text-teal)]",
        turquoise: "bg-[var(--tag-bg-turquoise)] text-[var(--tag-text-turquoise)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
