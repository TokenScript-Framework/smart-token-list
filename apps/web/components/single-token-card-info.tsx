"use client"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Check, CopyIcon } from "lucide-react"
import { ReactNode, useState } from "react"

export const SingleTokenCardInfo = (props: {
  title: string
  icon: ReactNode
  content: string
  contentTooltip?: string
  withCopy?: boolean
}) => {
  const [copySuccess, showCopySuccess] = useState(false)

  const copyToClipboard = async () => {
    navigator.clipboard
      .writeText(props.contentTooltip || props.content)
      .then(() => {
        showCopySuccess(true)
        setTimeout(() => {
          showCopySuccess(false)
        }, 2000)
      })
  }

  return (
    <TooltipProvider>
      <div className="flex w-full flex-none items-center justify-between gap-x-4">
        <div className="flex items-center gap-4">
          <span className="sr-only">{props.title}</span>
          <Tooltip delayDuration={0}>
            <TooltipTrigger>{props.icon}</TooltipTrigger>
            <TooltipContent>
              <p>{props.title}</p>
            </TooltipContent>
          </Tooltip>

          <div className="text-sm font-medium leading-6 text-gray-900">
            <Tooltip delayDuration={0}>
              <TooltipTrigger>{props.content}</TooltipTrigger>
              <TooltipContent>
                <p>{props.contentTooltip || props.content}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {props.withCopy && (
          <Button variant="ghost" size="icon" onClick={copyToClipboard}>
            {copySuccess ? (
              <Check className="h-4 w-4" />
            ) : (
              <CopyIcon className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
    </TooltipProvider>
  )
}
