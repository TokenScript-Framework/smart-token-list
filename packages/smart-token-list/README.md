# smart-token-list

This is the smart tokens collection. All tokens here should also implement the [ERC5169](https://eips.ethereum.org/EIPS/eip-5169) interface.

## Installation

```sh
npm i @repo/smart-token-list
```

build locally:

```sh
pnpm i
pnpm build
pnpm pack
```

Then you can copy the output file anywhere and use:

```sh
npm i /path/to/${pack_name}.tgz
```

to install.

## Usage

js code:

```js
const { fuzzySearch, stat } = require("@repo/smart-token-list")
// Also you can use our tokens.json directly
const token = require("@repo/smart-token-list/dist/tokens.json")

console.log(fuzzySearch("My Token"))
console.log(stat({ includeTestnet: true }))
```

ts code:

```ts
import { fuzzySearch, stat } from "@repo/smart-token-list"
// Make sure set {"resolveJsonModule": true, "esModuleInterop": true} in your tsconfig.json
import tokens from "@repo/smart-token-list/dist/tokens.json"

console.log(fuzzySearch("My Token"))
console.log(stat({ includeTestnet: true }))
```

## Submit smart tokens

All smart tokens should be submitted to `src/chain/${chainId}/{erc20.json,erc721.json,erc1155.json}`

`erc20.json` schema should like this:

```json
{
  "name": "Wrapped Ether",
  "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "symbol": "WETH",
  "decimals": 18,
  "chainId": 1,
  "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
}
```

`erc721.json` schema should like this:

```json
{
  "name": "COSCon’22 Collectible",
  "description": "We really appreciate your participation to COSCon’22 and hope to see you again the next year.",
  "image": "ipfs://bafybeicc4vygaek76mkbaywa53zbr35etjqodjfifqicycpfdnbupz4gem",
  "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "chainId": 1
}
```

And `erc1155.json` schema should like this:

```json
{
  "name": "COSCon’22 Collectible",
  "description": "We really appreciate your participation to COSCon’22 and hope to see you again the next year.",
  "image": "ipfs://bafybeicc4vygaek76mkbaywa53zbr35etjqodjfifqicycpfdnbupz4gem",
  "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "chainId": 1
}
```

Make sure unit test passed:

```sh
pnpm test
```
