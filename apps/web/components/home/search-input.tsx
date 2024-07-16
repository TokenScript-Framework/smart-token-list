"use client"
import { Search } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"

export function SearchInput() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("query", term)

    replace(`${pathname}?${params.toString()}`)
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className="sticky top-0 z-50 -m-5 rounded-[10px] bg-[#f3f3f3] p-5 dark:bg-[#181818]">
      <header className="sticky top-4 z-50 flex w-full items-end gap-2 rounded-[10px] shadow">
        <div className="flex flex-1 flex-col rounded-[10px] bg-white dark:bg-[#0D0D0D]">
          <div className="rounded-[10px] shadow-sm">
            <label className="flex flex-col rounded-[10px] ring-[#2F80ED] focus-within:ring-2 sm:flex-row sm:items-center dark:ring-[#2F80ED]">
              <span className="whitespace-nowrap px-3 pt-4 text-sm font-bold text-black sm:pt-0 dark:text-[#B3B3B3]">
                Search Smart Tokens
              </span>
              <input
                ref={inputRef}
                placeholder="SmartCat, SLN, ..."
                className="flex-1 bg-white px-3 pb-4 pt-2 text-black outline-none sm:px-2 sm:py-4 dark:bg-[#0D0D0D] dark:text-[#B3B3B3]"
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get("query")?.toString()}
              />
              <Search className="mr-3 hidden sm:block" />
            </label>
          </div>
        </div>
      </header>
    </div>
  )
}
