import { TokenCard } from "@/components/token-card"
import { Search } from "lucide-react"

export function SearchList() {
  return (
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
  )
}
