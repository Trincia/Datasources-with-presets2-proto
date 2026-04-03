import * as React from "react"
import { cn } from "@/lib/utils"
import { LoadingIcon } from "@/components/icons"

// Matches production DuBois Spinner:
// - Uses LoadingIcon (single arc SVG, same as production LoadingIcon)
// - steps(60, end) stepped rotation animation (not smooth) — matches production cssSpinner
// - Sizes: small=14px · default=20px · large=32px (antd spin-dot-size values)
// - Color: textSecondary (muted-foreground) by default, or inherit from parent

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "small" | "default" | "large"
  /** Inherit text color from parent instead of using muted-foreground */
  inheritColor?: boolean
  label?: string
}

const sizeMap = {
  small:   14,
  default: 20,
  large:   32,
} as const

function Spinner({
  size = "default",
  inheritColor = false,
  label = "Loading",
  className,
  style,
  ...props
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <LoadingIcon
        size={sizeMap[size]}
        aria-hidden="true"
        className={cn(inheritColor ? "text-current" : "text-muted-foreground")}
        style={{
          animation: "dubois-spin 1s steps(60, end) infinite",
          ...style,
        }}
      />
    </span>
  )
}

export { Spinner }
