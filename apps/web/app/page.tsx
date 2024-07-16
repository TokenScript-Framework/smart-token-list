import { HeroBackground } from "@/components/home/hero-background"
import { SearchList } from "@/components/home/search-list"
import { ViewSourceCode } from "@/components/home/view-source-code"
import { TokenScriptIcon } from "@/components/icons/tokenscript-icon"
import { Button } from "@/components/ui/button"

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
                  <ViewSourceCode />
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

      <SearchList />
    </div>
  )
}
