import { GithubIcon } from "@/components/icons/github-icon"
import { TokenScriptIcon } from "@/components/icons/tokenscript-icon"
import { TokenCard } from "@/components/token-card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function Page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[40vw,_auto]">
      <div className="relative h-full bg-white text-black dark:bg-[#0D0D0D] dark:text-[#B3B3B3]">
        <div className="sticky bottom-0 top-0 m-auto mx-auto flex flex-col items-center justify-center gap-8 lg:h-screen">
          <div className="h-full w-full bg-white">
            <div className="relative isolate h-full pt-14">
              <HeroBackground />

              <div className="mx-auto max-w-xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
                  <div className="flex">
                    <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                      <span className="text-primary font-semibold">
                        Open sourced
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-4 w-px bg-gray-900/10"
                      />
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
                  <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    <TokenScriptIcon />
                    Smart Token List
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    This website shows the list of Smart Tokens that conform to
                    the{" "}
                    <a
                      className="underline"
                      target="_blank"
                      href="https://github.com/ethereum/ercs/blob/master/ERCS/erc-5169.md"
                    >
                      ERC-5169
                    </a>{" "}
                    standard.
                  </p>
                  <div className="mt-10 flex items-center gap-x-6">
                    <Button asChild>
                      <a
                        target="_blank"
                        href="https://github.com/TokenScript-Framework/smart-token-list"
                      >
                        Add Your Token
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col gap-5 bg-[#f3f3f3] p-5 dark:bg-[#181818]">
        <div className="sticky top-0 z-50 -m-5 rounded-[10px] bg-[#f3f3f3] p-5 dark:bg-[#181818]">
          <header className="sticky top-4 z-50 flex w-full items-end gap-2 rounded-[10px] shadow">
            <div className="flex flex-1 flex-col rounded-[10px] bg-white dark:bg-[#0D0D0D]">
              <div className="rounded-[10px] shadow-sm">
                <label className="flex flex-col rounded-[10px] ring-[#2F80ED] focus-within:ring-2 sm:flex-row sm:items-center dark:ring-[#2F80ED]">
                  <span className="whitespace-nowrap px-3 pt-4 text-sm font-bold text-black sm:pt-0 dark:text-[#B3B3B3]">
                    Search Smart Tokens
                  </span>
                  <input
                    placeholder="Smart Cat, SLN, ..."
                    className="flex-1 bg-white px-3 pb-4 pt-2 text-black outline-none sm:px-2 sm:py-4 dark:bg-[#0D0D0D] dark:text-[#B3B3B3]"
                    defaultValue=""
                  />
                  <Search className="mr-3 hidden sm:block" />
                </label>
              </div>
            </div>
          </header>
        </div>

        <div className="isolate grid grid-flow-dense grid-cols-1 place-content-between gap-5 pb-4 text-black sm:pb-10 xl:grid-cols-[repeat(auto-fit,_calc(50%_-_15px))] 2xl:grid-cols-[repeat(auto-fit,_calc(33%_-_20px))] dark:text-[#B3B3B3]">
          {[...Array(10)].map((_, index) => (
            <TokenCard key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

function HeroBackground() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
    >
      <defs>
        <pattern
          x="50%"
          y={-1}
          id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
          width={200}
          height={200}
          patternUnits="userSpaceOnUse"
        >
          <path d="M100 200V.5M.5 .5H200" fill="none" />
        </pattern>
      </defs>
      <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
        <path
          d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
          strokeWidth={0}
        />
      </svg>
      <rect
        fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
        width="100%"
        height="100%"
        strokeWidth={0}
      />
    </svg>
  )
}
