import { GithubIcon } from "@/components/icons/github-icon"
import { TokenScriptIcon } from "@/components/icons/tokenscript-icon"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[45vw,_auto]">
      <div className="relative h-full bg-white text-black dark:bg-[#0D0D0D] dark:text-[#B3B3B3]">
        <div className="sticky bottom-0 top-0 m-auto mx-auto flex h-screen flex-col items-center justify-center gap-8">
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
                          <Link
                            target="_blank"
                            href={
                              "https://github.com/TokenScript-Framework/smart-token-list"
                            }
                          >
                            <GithubIcon />
                          </Link>
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
        placeholder
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
