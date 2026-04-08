"use client"

import * as React from "react"
import { ChevronsLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Figma assets
const genieCodeIconSrc  = "https://www.figma.com/api/mcp/asset/367fb273-be4c-4c11-94b1-0d4d5def516e"
// Header action icons
const iconPlusSrc       = "https://www.figma.com/api/mcp/asset/d25413b1-306f-4102-9dfe-59d4a84cc4c9"
const iconOverflowSrc   = "https://www.figma.com/api/mcp/asset/44e18ab6-9f8c-4df8-aa2a-7cdc34dd41a2"
const iconCloseSrc      = "https://www.figma.com/api/mcp/asset/a0edbea9-9e4a-4189-a43f-b5b5aff06e2b"
// Input action icons
const iconReferenceSrc  = "https://www.figma.com/api/mcp/asset/7bcb3431-a42f-4b10-b88e-ba7ab6d5bf98"
const iconCommandsSrc   = "https://www.figma.com/api/mcp/asset/4a737881-3199-4754-9a29-8d952693b543"
const iconSendSrc       = "https://www.figma.com/api/mcp/asset/bf1f5b55-9f7f-4f4e-993f-79fd31a85a01"

/** 16×16 icon rendered from a Figma asset URL */
function FigmaIcon({ src, inset, alt }: { src: string; inset: string; alt: string }) {
  return (
    <div className="relative shrink-0 size-4">
      <div className="absolute" style={{ inset }}>
        <img alt={alt} className="absolute block size-full max-w-none" src={src} />
      </div>
    </div>
  )
}

interface GenieCodePanelProps {
  open: boolean
  onClose: () => void
  className?: string
}

const SUGGESTION_CHIPS = [
  "Create automation",
  "What automation is best for my data?",
  "View latest automation",
]

export function GenieCodePanel({ open, onClose, className }: GenieCodePanelProps) {
  return (
    <div
      className={cn(
        "flex flex-col shrink-0 bg-background overflow-hidden",
        open ? "w-[360px]" : "w-0",
        className
      )}
    >
      {open && (
        <>
          {/* Header */}
          <div
            className="flex shrink-0 items-center gap-2 border-b border-border pl-3 pr-3 py-2"
          >
            <div className="flex flex-1 items-center gap-2">
              <ChevronsLeft className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-[13px] font-semibold leading-5 text-foreground">
                Genie Code
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                className="flex h-6 w-6 items-center justify-center overflow-hidden rounded px-1 hover:bg-muted"
                aria-label="New conversation"
              >
                <div className="-scale-y-100 flex-none rotate-180">
                  <FigmaIcon src={iconPlusSrc} inset="6.25%" alt="New conversation" />
                </div>
              </button>
              <button
                className="flex h-6 w-6 items-center justify-center overflow-hidden rounded px-1 hover:bg-muted"
                aria-label="More options"
              >
                <div className="-scale-y-100 flex-none rotate-180">
                  <FigmaIcon src={iconOverflowSrc} inset="6.25% 39.06%" alt="More options" />
                </div>
              </button>
              <button
                className="flex h-6 w-6 items-center justify-center overflow-hidden rounded px-1 hover:bg-muted"
                aria-label="Close Genie Code"
                onClick={onClose}
              >
                <FigmaIcon src={iconCloseSrc} inset="12.5% 12.12% 12.12% 12.5%" alt="Close" />
              </button>
            </div>
          </div>

          {/* Body — empty state */}
          <div className="flex flex-1 flex-col items-center justify-center overflow-hidden pt-3 px-3">
            <div className="flex flex-col items-center gap-4 px-6 w-full">
              {/* Genie Code icon — 48×48 container, vector has 10.94% top/bottom inset, full width */}
              <div className="relative size-12 shrink-0">
                <div className="absolute inset-x-0" style={{ top: "10.94%", bottom: "10.94%" }}>
                  <img
                    src={genieCodeIconSrc}
                    alt="Genie Code"
                    className="absolute block size-full"
                  />
                </div>
              </div>

              {/* Title + subtitle */}
              <div className="flex flex-col gap-2 items-center text-center w-full">
                <p className="text-[22px] font-semibold leading-7 text-foreground">
                  Genie Code
                </p>
                <p className="text-[13px] leading-5 text-muted-foreground">
                  Run multi-step data and AI tasks
                </p>
              </div>

              {/* Suggestion chips */}
              <div className="flex flex-wrap justify-center gap-2 w-full">
                {SUGGESTION_CHIPS.map((label) => (
                  <button
                    key={label}
                    className="cursor-pointer bg-secondary text-foreground text-[13px] leading-5 rounded-lg px-3 py-1.5 hover:bg-muted active:bg-muted/80 transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Compose area */}
          <div className="flex shrink-0 flex-col gap-2 p-3 rounded-b-2xl">
            {/* Input box */}
            <div className="bg-background border border-[#c0cdd8] rounded-xl p-3 shadow-[0px_2px_3px_0px_rgba(0,0,0,0.05),0px_1px_0px_0px_rgba(0,0,0,0.02)] w-full">
              {/* Text input */}
              <textarea
                rows={1}
                placeholder="Start typing"
                className="w-full resize-none bg-transparent text-[13px] leading-5 text-foreground placeholder:text-muted-foreground outline-none min-h-5"
              />
              {/* Action bar */}
              <div className="flex items-end justify-between mt-3">
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon-xs" className="h-7 w-7" aria-label="Attach reference">
                    <FigmaIcon src={iconReferenceSrc} inset="6.25%" alt="Add reference" />
                  </Button>
                  <Button variant="ghost" size="icon-xs" className="h-7 w-7" aria-label="Mention object">
                    <FigmaIcon src={iconCommandsSrc} inset="6.25%" alt="Mention" />
                  </Button>
                </div>
                <Button variant="ghost" size="icon-xs" className="h-7 w-7" aria-label="Send message">
                  <FigmaIcon src={iconSendSrc} inset="6.25% 0 6.25% 6.25%" alt="Send" />
                </Button>
              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-[12px] leading-4 text-muted-foreground">
              Only use the agent with code and data you trust
            </p>
          </div>
        </>
      )}
    </div>
  )
}
