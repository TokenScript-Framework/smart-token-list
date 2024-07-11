import { ethers } from "ethers";

const ERC20_ABI = [
  "function totalSupply() public view returns (uint256)",
  "function balanceOf(address _owner) public view returns (uint256 balance)",
];
const ERC165_ABI = [
  "function supportsInterface(bytes4 interfaceId) view returns (bool)",
];
const ERC5169_ABI = [
  "function scriptURI() external view returns(string[] memory)",
];

const ERC721_INTERFACE_ID = "0x80ac58cd";
const ERC1155_INTERFACE_ID = "0xd9b67a26";

function getProvider(chainId: number): ethers.Provider {
  let rpcUrl;
  switch (chainId) {
    // mainnet
    case 1:
      rpcUrl = "https://eth.llamarpc.com";
      break;
    // polygon
    case 137:
      rpcUrl = "https://polygon.llamarpc.com";
      break;
    // klaytn mainnet
    case 8217:
      rpcUrl = "https://klaytn.blockpi.network/v1/rpc/public";
      break;
    default:
      return ethers.getDefaultProvider(chainId);
  }
  return new ethers.JsonRpcProvider(rpcUrl, chainId);
}

export function getDuplicates(json: any[], ...keys: string[]): any[] {
  const jsonCopy = [...json];
  const duplicates = [];
  let item: any;
  while ((item = jsonCopy.pop())) {
    if (
      jsonCopy.some((item2) => {
        return keys.every((key) => {
          if (typeof item[key] === "string") {
            return item[key].toLowerCase() === item2[key].toLowerCase();
          } else {
            return item[key] === item2[key];
          }
        });
      })
    ) {
      duplicates.push(item);
    }
  }
  return duplicates;
}

export async function isERC20(chainId: number, address: string) {
  const contract = new ethers.Contract(
    address,
    ERC20_ABI,
    getProvider(chainId)
  );
  try {
    await Promise.all([
      contract.totalSupply!(),
      contract.balanceOf!("0x0000000000000000000000000000000000000000"),
    ]);
    return true;
  } catch (err: unknown) {
    return false;
  }
}

export async function isERC721(chainId: number, address: string) {
  const contract = new ethers.Contract(
    address,
    ERC165_ABI,
    getProvider(chainId)
  );
  try {
    await contract.supportsInterface!(ERC721_INTERFACE_ID);
    return true;
  } catch (err: unknown) {
    return false;
  }
}

export async function isERC1155(chainId: number, address: string) {
  const contract = new ethers.Contract(
    address,
    ERC165_ABI,
    getProvider(chainId)
  );
  try {
    await contract.supportsInterface!(ERC1155_INTERFACE_ID);
    return true;
  } catch (err: unknown) {
    return false;
  }
}

export async function isERC5169(chainId: number, address: string) {
  const contract = new ethers.Contract(
    address,
    ERC5169_ABI,
    getProvider(chainId)
  );
  try {
    await contract.scriptURI!();
    return true;
  } catch (err: unknown) {
    return false;
  }
}
