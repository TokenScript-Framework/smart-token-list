import tokens from "./tokens.json"
import { TokenInfo } from "./types"

export * from "./types"

const ALL_TOKENS = tokens as TokenInfo[]

export function query(params: {
  chain?: string
  name?: string
  address?: string
  fuzzy?: boolean
}): TokenInfo[] {
  if (!(params.chain || params.name || params.address)) {
    throw new Error("At least one of chain, name, address must be provided.")
  }

  // TODO: Impl
  return ALL_TOKENS
}

export function fuzzySearch(str: string): TokenInfo[] {
  const result = new Set<TokenInfo>()
  query({ chain: str, fuzzy: true }).forEach((item) => {
    result.add(item)
  })
  query({ name: str, fuzzy: true }).forEach((item) => {
    result.add(item)
  })
  query({ address: str, fuzzy: true }).forEach((item) => {
    result.add(item)
  })
  return [...result]
}

export function stat(params?: { includeTestnet?: boolean }): {
  chains: number
  contracts: number
} {
  // TODO: impl
  return { chains: 1, contracts: 1 }
}
