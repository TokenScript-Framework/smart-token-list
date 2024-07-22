import { CHAIN_ID_MAP } from "./chain-map"
import blocked from "./chain/blocked.json"
import tokens from "./tokens.json"
import { BlockedToken, TokenInfo } from "./types"

export * from "./types"

export * from "./chain-map"

const ALL_TOKENS: TokenInfo[] = tokens as TokenInfo[]
const BLOCKED_TOKENS: BlockedToken[] = blocked as BlockedToken[]

function numberMatched(num1: number, num2: number, fuzzy = false): boolean {
  if (fuzzy) {
    return num1.toString().includes(num2.toString())
  } else {
    return num1 === num2
  }
}

function stringMatched(str1: string, str2: string, fuzzy = false): boolean {
  if (fuzzy) {
    return str1.toLowerCase().includes(str2.toLowerCase())
  } else {
    return str1.toLowerCase() === str2.toLowerCase()
  }
}

export function blockedTokens(): BlockedToken[] {
  return BLOCKED_TOKENS
}

export function query(params: {
  chainId?: number
  name?: string
  address?: string
  symbol?: string
  fuzzy?: boolean
}): TokenInfo[] {
  if (!(params.chainId || params.name || params.address || params.symbol)) {
    return ALL_TOKENS
  }

  return ALL_TOKENS.filter((token) => {
    if (params.symbol) {
      if (token.type !== "erc20") {
        return false
      }
      if (!stringMatched(token.symbol, params.symbol, params.fuzzy)) {
        return false
      }
    }
    if (params.chainId) {
      if (!numberMatched(token.chainId, params.chainId, params.fuzzy)) {
        return false
      }
    }
    if (params.name) {
      if (!stringMatched(token.name, params.name, params.fuzzy)) {
        return false
      }
    }
    if (params.address) {
      if (!stringMatched(token.address, params.address, params.fuzzy)) {
        return false
      }
    }
    return true
  })
}

export function fuzzySearch(str: string): TokenInfo[] {
  const result = new Set<TokenInfo>()
  if (Number(str)) {
    query({ chainId: Number(str), fuzzy: true }).forEach((item) => {
      result.add(item)
    })
  }
  query({ name: str, fuzzy: true }).forEach((item) => {
    result.add(item)
  })
  query({ address: str, fuzzy: true }).forEach((item) => {
    result.add(item)
  })
  query({ symbol: str, fuzzy: true }).forEach((item) => {
    result.add(item)
  })
  return [...result]
}

export function stat(params?: { includeTestnet?: boolean }): {
  chains: number
  contracts: number
} {
  const includeTestnet = params?.includeTestnet ?? false
  const result = ALL_TOKENS.reduce(
    (acc, cur) => {
      if (!includeTestnet && CHAIN_ID_MAP[cur.chainId]?.isTestnet) {
        return acc
      }

      acc.contracts++
      if (!acc.chainIds.includes(cur.chainId)) {
        acc.chainIds.push(cur.chainId)
        acc.chains++
      }

      return acc
    },
    {
      chains: 0,
      contracts: 0,
      chainIds: [] as number[],
    }
  )
  return { chains: result.chains, contracts: result.contracts }
}

export function getChains(params?: { includeTestnet?: boolean }) {
  const includeTestnet = params?.includeTestnet ?? false
  return ALL_TOKENS.reduce((acc, cur) => {
    if (!includeTestnet && CHAIN_ID_MAP[cur.chainId]?.isTestnet) {
      return acc
    }

    if (!acc.includes(cur.chainId)) {
      acc.push(cur.chainId)
    }

    return acc
  }, [] as number[])
}
