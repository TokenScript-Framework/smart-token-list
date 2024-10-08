"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CHAIN_ID_MAP } from "@st/smart-token-list"
import { Search, X } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"
import { useDebouncedCallback } from "use-debounce"

export function SearchInput() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query")

  const pathname = usePathname()
  const { replace } = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("query", term)

    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, 300)

  const handleToggleTestnet = useDebouncedCallback(
    (includeTestnets: boolean) => {
      const params = new URLSearchParams(searchParams)
      params.set("includeTestnets", includeTestnets.toString())

      replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    300
  )

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className="sticky top-0 z-50 -m-5 rounded-[10px] bg-[#f3f3f3] p-5 dark:bg-[#181818]">
      <header className="sticky top-4 z-50 flex w-full items-end gap-2 rounded-[10px] shadow">
        <div className="flex flex-1 flex-col rounded-[10px] bg-white dark:bg-[#0D0D0D]">
          <div className="rounded-t-[10px] shadow-sm">
            <label className="flex flex-col rounded-t-[10px] ring-[#2F80ED] focus-within:ring-2 sm:flex-row sm:items-center dark:ring-[#2F80ED]">
              <span className="whitespace-nowrap px-3 pt-4 font-bold text-black sm:pt-0 dark:text-[#B3B3B3]">
                Search Smart Tokens
              </span>
              <input
                ref={inputRef}
                placeholder="SmartCat, SLN, ..."
                className="flex-1 bg-white px-3 pb-4 pt-2 text-black outline-none sm:px-2 sm:py-4 dark:bg-[#0D0D0D] dark:text-[#B3B3B3]"
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get("query")?.toString()}
              />
              {query ? (
                <X
                  className="mr-3 hidden cursor-pointer sm:block"
                  onClick={() => {
                    if (inputRef.current) {
                      inputRef.current.value = ""
                      handleSearch("")
                    }
                  }}
                />
              ) : (
                <Search className="mr-3 hidden sm:block" />
              )}
            </label>
          </div>
          <div className="flex flex-col gap-4 px-3 py-2 text-black sm:flex-row sm:items-center sm:justify-between dark:text-[#B3B3B3]">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="testnets"
                onChange={(e) => handleToggleTestnet(e.target.checked)}
                defaultChecked={
                  searchParams.get("includeTestnets")?.toString() === "true"
                }
              />
              <span>Include Testnets</span>
            </label>
            <ChainFilter></ChainFilter>
          </div>
        </div>
      </header>
    </div>
  )
}

function ChainFilter() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleChainFilterChange = useDebouncedCallback((chain: string) => {
    const params = new URLSearchParams(searchParams)
    if (chain === "all") {
      params.set("chain", chain)
    } else {
      params.set("chain", chain)
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, 300)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <Select defaultValue="all" onValueChange={handleChainFilterChange}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a chain" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">Chain: All</SelectItem>
          {Object.values(CHAIN_ID_MAP).map((v) => (
            <SelectItem
              key={v.chain}
              value={v.chain.toString()}
            >{`${v.name} (${v.chain})`}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
