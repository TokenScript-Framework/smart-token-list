import { ethers } from "ethers"

const ERC20_ABI = [
  "function totalSupply() public view returns (uint256)",
  "function balanceOf(address _owner) public view returns (uint256 balance)",
]
const ERC165_ABI = [
  "function supportsInterface(bytes4 interfaceId) view returns (bool)",
]
const ERC5169_ABI = [
  "function scriptURI() external view returns(string[] memory)",
]

const ERC721_INTERFACE_ID = "0x80ac58cd"
const ERC1155_INTERFACE_ID = "0xd9b67a26"

// some tokens will not pass the interface check
const ERC721_WHITE_LIST: Record<number, string[]> = {
  137: ["0x7db4de78e6b9a98752b56959611e4cfda52269d2"],
}

function getProvider(chainId: number): ethers.Provider {
  let rpcUrl: string
  switch (chainId) {
    // mainnet
    case 1:
      rpcUrl = "https://eth.llamarpc.com"
      break
    // Goerli
    case 5:
      rpcUrl = "https://eth-goerli.public.blastapi.io"
      break
    // OP Mainnet
    case 10:
      rpcUrl = "https://optimism.llamarpc.com"
      break
    // polygon
    case 137:
      rpcUrl = "https://polygon.meowrpc.com"
      break
    // Mint Mainnet
    case 185:
      rpcUrl = "https://global.rpc.mintchain.io"
      break
    // X Layer Testnet
    case 195:
      rpcUrl = "https://testrpc.xlayer.tech"
      break
    // Klaytn Testnet Baobab
    case 1001:
      rpcUrl = "https://klaytn-baobab.g.allthatnode.com/full/evm"
      break
    // Mint Sepolia Testnet
    case 1687:
      rpcUrl = "https://sepolia-testnet-rpc.mintchain.io"
      break
    // Klaytn Mainnet Cypress
    case 8217:
      rpcUrl = "https://klaytn.blockpi.network/v1/rpc/public"
      break
    // Base
    case 8453:
      rpcUrl = "https://base-pokt.nodies.app"
      break
    // Arbitrum One
    case 42161:
      rpcUrl = "https://arbitrum.llamarpc.com"
      break
    // Linea Goerli
    case 59140:
      rpcUrl = "https://rpc.goerli.linea.build"
      break
    // Mumbai
    case 80001:
      rpcUrl = "https://polygon-testnet.public.blastapi.io"
      break
    // Amoy
    case 80002:
      rpcUrl = "https://polygon-amoy.drpc.org"
      break
    // Base Sepolia Testnet
    case 84532:
      rpcUrl = "https://sepolia.base.org"
      break
    // Sepolia
    case 11155111:
      rpcUrl = "https://ethereum-sepolia-rpc.publicnode.com"
      break
    // OP Sepolia Testnet
    case 11155420:
      rpcUrl = "https://optimism-sepolia.blockpi.network/v1/rpc/public"
      break
    default:
      return ethers.getDefaultProvider(chainId)
  }
  return new ethers.JsonRpcProvider(rpcUrl, chainId, { staticNetwork: true })
}

export function getDuplicates(json: any[], ...keys: string[]): any[] {
  const jsonCopy = [...json]
  const duplicates = []
  let item: any
  while ((item = jsonCopy.pop())) {
    if (
      jsonCopy.some((item2) => {
        return keys.every((key) => {
          if (typeof item[key] === "string") {
            return item[key].toLowerCase() === item2[key].toLowerCase()
          } else {
            return item[key] === item2[key]
          }
        })
      })
    ) {
      duplicates.push(item)
    }
  }
  return duplicates
}

export async function isERC20(
  chainId: number,
  address: string
): Promise<boolean> {
  const contract = new ethers.Contract(address, ERC20_ABI, getProvider(chainId))
  try {
    await Promise.all([
      contract.totalSupply!(),
      contract.balanceOf!("0x0000000000000000000000000000000000000000"),
    ])
    return true
  } catch (err: unknown) {
    return false
  }
}

export async function isERC721(
  chainId: number,
  address: string
): Promise<boolean> {
  if (
    ERC721_WHITE_LIST[chainId]?.some(
      (item) => item.toLowerCase() === address.toLowerCase()
    )
  ) {
    return true
  }
  const contract = new ethers.Contract(
    address,
    ERC165_ABI,
    getProvider(chainId)
  )
  return contract.supportsInterface!(ERC721_INTERFACE_ID).catch(() => false)
}

export async function isERC1155(
  chainId: number,
  address: string
): Promise<boolean> {
  const contract = new ethers.Contract(
    address,
    ERC165_ABI,
    getProvider(chainId)
  )
  return contract.supportsInterface!(ERC1155_INTERFACE_ID).catch(() => false)
}

export async function isERC5169(chainId: number, address: string) {
  const contract = new ethers.Contract(
    address,
    ERC5169_ABI,
    getProvider(chainId)
  )
  try {
    await contract.scriptURI!()
    return true
  } catch (err: unknown) {
    return false
  }
}
