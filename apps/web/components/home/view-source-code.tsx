import { GithubIcon } from "@/components/icons/github-icon"
import { Button } from "@/components/ui/button"

export function ViewSourceCode() {
  return (
    <div className="flex">
      <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
        <span className="text-primary font-semibold">Open sourced</span>
        <span aria-hidden="true" className="h-4 w-px bg-gray-900/10" />
        <a
          href="https://github.com/TokenScript-Framework/smart-token-list"
          className="flex items-center gap-1"
          target="_blank"
        >
          <span aria-hidden="true" className="absolute inset-0" />
          View source code
          <Button asChild size="sm" variant="ghost">
            <GithubIcon />
          </Button>
        </a>
      </div>
    </div>
  )
}
