"use client"

import * as React from "react"
import { ChevronsLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DbIcon } from "@/components/ui/db-icon"
import { SuggestionPill } from "@/components/ui/suggestion-pill"
import { cn } from "@/lib/utils"
import {
  GenieCodeIcon,
  PlusIcon,
  OverflowIcon,
  CloseIcon,
  PaperclipIcon,
  AtIcon,
  SendIcon,
} from "@/components/icons"

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
          <div className="flex shrink-0 items-center gap-2 border-b border-border px-3 py-2">
            <div className="flex flex-1 items-center gap-2">
              <ChevronsLeft className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-[13px] font-semibold leading-5 text-foreground">
                Genie Code
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon-xs" aria-label="New conversation">
                <PlusIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon-xs" aria-label="More options">
                <OverflowIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon-xs" aria-label="Close Genie Code" onClick={onClose}>
                <CloseIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Body — empty state */}
          <div className="flex flex-1 flex-col items-center justify-center overflow-hidden pt-3 px-3">
            <div className="flex flex-col items-center gap-4 px-6 w-full">
              {/* Genie Code icon */}
              <DbIcon icon={GenieCodeIcon} color="ai" size={48} />

              {/* Title + subtitle */}
              <div className="flex flex-col gap-2 items-center text-center w-full">
                <p className="text-xl font-semibold leading-7 text-foreground">
                  Genie Code
                </p>
                <p className="text-[13px] leading-5 text-muted-foreground">
                  Run multi-step data and AI tasks
                </p>
              </div>

              {/* Suggestion chips */}
              <div className="flex flex-wrap justify-center gap-2 w-full">
                {SUGGESTION_CHIPS.map((label) => (
                  <SuggestionPill key={label}>{label}</SuggestionPill>
                ))}
              </div>
            </div>
          </div>

          {/* Compose area */}
          <div className="flex shrink-0 flex-col gap-2 p-3 rounded-b-2xl">
            {/* Input box */}
            <div className="bg-background border border-border rounded-xl p-3 shadow-[var(--shadow-db-sm)] w-full">
              {/* Text input */}
              <textarea
                rows={1}
                placeholder="Start typing"
                className="w-full resize-none bg-transparent text-[13px] leading-5 text-foreground placeholder:text-muted-foreground outline-none min-h-5"
              />
              {/* Action bar */}
              <div className="flex items-end justify-between mt-3">
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon-xs" aria-label="Attach reference">
                    <PaperclipIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon-xs" aria-label="Mention object">
                    <AtIcon className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="ghost" size="icon-xs" aria-label="Send message">
                  <SendIcon className="h-4 w-4" />
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
