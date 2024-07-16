"use client"
import { SearchInput } from "@/components/home/search-input"
import { TokenCard } from "@/components/token-card"
import { fuzzySearch, TokenInfo } from "@repo/smart-token-list"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function SearchList() {
  const [list, setList] = useState<TokenInfo[]>([])

  const searchParams = useSearchParams()
  const query = searchParams.get("query")
  const chain = searchParams.get("chain") || "all"

  useEffect(() => {
    const searchResults = fuzzySearch(query || "")
    if (chain === "all") {
      setList(searchResults)
    } else {
      setList(
        searchResults.filter((token) => token.chainId.toString() === chain)
      )
    }
  }, [chain, query])

  return (
    <div className="relative flex flex-col gap-5 bg-[#f3f3f3] p-5 dark:bg-[#181818]">
      <SearchInput />

      <div className="isolate grid grid-flow-dense grid-cols-1 place-content-between gap-5 pb-4 text-black sm:pb-10 xl:grid-cols-[repeat(auto-fit,_calc(50%_-_15px))] 2xl:grid-cols-[repeat(auto-fit,_calc(33%_-_20px))] dark:text-[#B3B3B3]">
        {list.map((v, index) => (
          <TokenCard key={index} tokenInfo={v} />
        ))}
      </div>
    </div>
  )
}
