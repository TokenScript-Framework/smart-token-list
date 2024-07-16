// can get information from https://chainid.network/chains.json

export const CHAIN_ID_MAP: {
  [chainId: string | number]: {
    name: string
    chain: number
    isTestnet?: boolean
  }
} = {
  "1": { name: "ethereum", chain: 1 },
  "5": { name: "Ethereum Testnet Goerli", isTestnet: true, chain: 5 },
  "137": { name: "polygon", chain: 137 },
  "195": { name: "X Layer Testnet", isTestnet: true, chain: 195 },
  "1001": { name: "Klaytn Testnet Baobab", isTestnet: true, chain: 1001 },
  "1687": { name: "Mint Sepolia Testnet", isTestnet: true, chain: 1687 },
  "8000": { name: "Teleport", chain: 8000 },
  "8217": { name: "klaytn", chain: 8217 },
  "59140": { name: "Linea Goerli Testnet", isTestnet: true, chain: 59140 },
  "80001": { name: "Polygon Testnet Mumbai", isTestnet: true, chain: 80001 },
  "80002": { name: "Polygon Amoy Testnet", isTestnet: true, chain: 80002 },
  "84532": { name: "Base Sepolia Testnet", isTestnet: true, chain: 84532 },
  "11155111": {
    name: "Ethereum Testnet Sepolia",
    isTestnet: true,
    chain: 11155111,
  },
  "11155420": { name: "OP Sepolia Testnet", isTestnet: true, chain: 11155420 },
}
