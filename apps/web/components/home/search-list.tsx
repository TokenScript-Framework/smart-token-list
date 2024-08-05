"use client"
import { SearchInput } from "@/components/home/search-input"
import { TokenCard } from "@/components/token-card"
import { CHAIN_ID_MAP, fuzzySearch, TokenInfo } from "@st/smart-token-list"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function SearchList() {
  const [list, setList] = useState<TokenInfo[]>([])

  const searchParams = useSearchParams()
  const query = searchParams.get("query")
  const chain = searchParams.get("chain") || "all"
  const includeTestnets = searchParams.get("includeTestnets") === "true"

  useEffect(() => {
    const searchResults = fuzzySearch(query || "").filter((v) => {
      if (!includeTestnets) {
        return !CHAIN_ID_MAP[v.chainId]?.isTestnet
      }
      return true
    })

    if (chain === "all") {
      setList(searchResults)
    } else {
      setList(
        searchResults.filter((token) => token.chainId.toString() === chain)
      )
    }
  }, [chain, includeTestnets, query])

  return (
    <div className="relative flex flex-col gap-5 bg-[#f3f3f3] p-5 dark:bg-[#181818]">
      <SearchInput />

      <div className="isolate grid grid-flow-dense grid-cols-1 place-content-between gap-5 pb-4 text-black sm:pb-10 xl:grid-cols-[repeat(auto-fit,_calc(50%_-_15px))] 2xl:grid-cols-3 dark:text-[#B3B3B3]">
        {list.map((v, index) => (
          <TokenCard key={index} tokenInfo={v} />
        ))}
      </div>
    </div>
  )
}
