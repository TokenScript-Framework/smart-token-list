import { z } from "zod";

/**
 * Common token info for all token types
 */
export const BaseTokenSchema = z.object({
  type: z.string(),
  name: z.string(),
  address: z.string().startsWith("0x").length(42),
  chainId: z.number(),
});

/**
 * ERC20 token info
 *
 * @example
 * {
 *   "type": "erc20",
 *   "name": "Wrapped Ether",
 *   "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
 *   "symbol": "WETH",
 *   "decimals": 18,
 *   "chainId": 1,
 *   "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
 * }
 */
export const Erc20Schema = BaseTokenSchema.extend({
  type: z.literal("erc20"),
  symbol: z.string(),
  decimals: z.number().gte(0).lte(18),
  logoURI: z.string(),
}).strict();

/**
 * ERC721 token info
 *
 * @example
 * {
 *   "type": "erc721",
 *   "name": "COSCon’22 Collectible",
 *   "description": "We really appreciate your participation to COSCon’22 and hope to see you again the next year.",
 *   "image": "ipfs://bafybeicc4vygaek76mkbaywa53zbr35etjqodjfifqicycpfdnbupz4gem",
 *   "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
 *   "chainId": 1
 * }
 */
export const Erc721Schema = BaseTokenSchema.extend({
  type: z.literal("erc721"),
  description: z.string(),
  image: z.string(),
}).strict();

/**
 * ERC1155 token info
 *
 * @example
 * {
 *   "type": "erc1155",
 *   "name": "COSCon’22 Collectible",
 *   "description": "We really appreciate your participation to COSCon’22 and hope to see you again the next year.",
 *   "image": "ipfs://bafybeicc4vygaek76mkbaywa53zbr35etjqodjfifqicycpfdnbupz4gem",
 *   "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
 *   "chainId": 1
 * }
 */
export const Erc1155Schema = Erc721Schema.extend({
  type: z.literal("erc1155"),
}).strict();

export const TokenInfoSchema = z.union([
  Erc20Schema,
  Erc721Schema,
  Erc1155Schema,
]);

export type Erc20 = z.infer<typeof Erc20Schema>;
export type Erc721 = z.infer<typeof Erc721Schema>;
export type Erc1155 = z.infer<typeof Erc1155Schema>;
export type TokenInfo = z.infer<typeof TokenInfoSchema>;
