import tokens from "./tokens.json"
import { TokenInfo } from "./types"

export * from "./types"

const ALL_TOKENS: TokenInfo[] = tokens as TokenInfo[]
// TODO: add testnet chainid
const TESTNET_CHAINID_LIST: number[] = [80001, 1001]

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

export function query(params: {
  chainId?: number
  name?: string
  address?: string
  fuzzy?: boolean
}): TokenInfo[] {
  if (!(params.chainId || params.name || params.address)) {
    throw new Error("At least one of chain, name, address must be provided.")
  }

  return ALL_TOKENS.filter((token) => {
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
  return [...result]
}

export function stat(params?: { includeTestnet?: boolean }): {
  chains: number
  contracts: number
} {
  const includeTestnet = params?.includeTestnet ?? false
  const result = ALL_TOKENS.reduce(
    (acc, cur) => {
      if (!includeTestnet && TESTNET_CHAINID_LIST.includes(cur.chainId)) {
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
