import test from "ava"
import fs from "fs"
import path from "path"
import { z } from "zod"
import {
  BlockedTokenSchema,
  Erc1155Schema,
  Erc20Schema,
  Erc721Schema,
} from "../src"
import {
  BASE_PATH,
  readAllERC1155Files,
  readAllERC20Files,
  readAllERC721Files,
  readAllJsonFilesUnderDir,
  readAllTokens,
  readBlockedTokens,
  readJSONFile,
} from "../src/utils"
import {
  getDuplicates,
  isERC1155,
  isERC20,
  isERC5169,
  isERC721,
} from "./_utils"

const ERC20_JSON_CONTENT = readAllERC20Files()
const ERC721_JSON_CONTENT = readAllERC721Files()
const ERC1155_JSON_CONTENT = readAllERC1155Files()
const ALL_TOKENS = readAllTokens()
const BLOCKED_TOKENS = readBlockedTokens()

test("blocked.json should match the schema", (t) => {
  t.notThrows(() => z.array(BlockedTokenSchema).parse(readBlockedTokens()))
})

test("blocked.json should not contains duplicate items", (t) => {
  const blockedDuplicates = getDuplicates(
    readBlockedTokens(),
    "address",
    "chainId"
  )
  t.is(
    blockedDuplicates.length,
    0,
    `${blockedDuplicates.length} duplicate items found in blocked.json:
${JSON.stringify(blockedDuplicates, null, 2)}`
  )
})

test("all src/chain/{chainId}/*.json should not contain blocked.json items", (t) => {
  const blocked = ALL_TOKENS.filter((token) => {
    return BLOCKED_TOKENS.some((b) => {
      return (
        b.chainId === token.chainId &&
        b.address.toLowerCase() === token.address.toLowerCase()
      )
    })
  })
  t.is(
    blocked.length,
    0,
    `${blocked.length} blocked tokens found: ${JSON.stringify(blocked, null, 2)}`
  )
})

test("erc20.json should match the schema", (t) => {
  t.notThrows(() =>
    z.array(Erc20Schema.omit({ type: true })).parse(ERC20_JSON_CONTENT)
  )
})

test("erc721.json should match the schema", (t) => {
  t.notThrows(() =>
    z.array(Erc721Schema.omit({ type: true })).parse(ERC721_JSON_CONTENT)
  )
})

test("erc1155.json should match the schema", (t) => {
  t.notThrows(() =>
    z.array(Erc1155Schema.omit({ type: true })).parse(ERC1155_JSON_CONTENT)
  )
})

test("erc20.json should not contains duplicate items", (t) => {
  const erc20Duplicates = getDuplicates(
    ERC20_JSON_CONTENT,
    "address",
    "chainId"
  )
  t.is(
    erc20Duplicates.length,
    0,
    `${erc20Duplicates.length} duplicate items found in erc20.json:
${JSON.stringify(erc20Duplicates, null, 2)}`
  )
})

test("erc721.json should not contains duplicate items", (t) => {
  const erc721Duplicates = getDuplicates(
    ERC721_JSON_CONTENT,
    "address",
    "chainId"
  )
  t.is(
    erc721Duplicates.length,
    0,
    `${erc721Duplicates.length} duplicate items found in erc721.json:
${JSON.stringify(erc721Duplicates, null, 2)}`
  )
})

test("erc1155.json should not contains duplicate items", (t) => {
  const erc1155Duplicates = getDuplicates(
    ERC1155_JSON_CONTENT,
    "address",
    "chainId"
  )
  t.is(
    erc1155Duplicates.length,
    0,
    `${erc1155Duplicates.length} duplicate items found in erc1155.json:
${JSON.stringify(erc1155Duplicates, null, 2)}`
  )
})

test("chainId of all items in the json file should match its directory", (t) => {
  const dirs = fs
    .readdirSync(BASE_PATH, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  for (const dir of dirs) {
    const json = readAllJsonFilesUnderDir(path.join(BASE_PATH, dir))
    const invalid = json.filter((item: any) => {
      return item.chainId !== parseInt(dir)
    })
    t.is(
      invalid.length,
      0,
      `${invalid.length} items found in chain/${dir}/ with invalid chainId:
${JSON.stringify(invalid, null, 2)}`
    )
  }
})

test("all items in erc20.json should be ERC20 tokens", async (t) => {
  let jsonContent = ERC20_JSON_CONTENT
  if (fs.existsSync(path.join(__dirname, "../diff_erc20.json"))) {
    const diffErc20 = readJSONFile(path.join(__dirname, "../diff_erc20.json"))
    jsonContent = ERC20_JSON_CONTENT.filter((item) =>
      diffErc20.some(
        (d: any) => item.chainId === d.chainId && item.address === d.address
      )
    )
  }
  await t.notThrowsAsync(
    Promise.all(
      jsonContent.map(async (item: any) => {
        const result = await isERC20(item.chainId, item.address)
        if (!result) {
          throw new Error(
            `${item.address} on chainId ${item.chainId} is not a valid ERC20 token`
          )
        }
        return result
      })
    )
  )
})

test("all items in erc20.json should be ERC5169 tokens", async (t) => {
  let jsonContent = ERC20_JSON_CONTENT
  if (fs.existsSync(path.join(__dirname, "../diff_erc20.json"))) {
    const diffErc20 = readJSONFile(path.join(__dirname, "../diff_erc20.json"))
    jsonContent = ERC20_JSON_CONTENT.filter((item) =>
      diffErc20.some(
        (d: any) => item.chainId === d.chainId && item.address === d.address
      )
    )
  }
  await t.notThrowsAsync(
    Promise.all(
      jsonContent.map(async (item: any) => {
        const result = await isERC5169(item.chainId, item.address)
        if (!result) {
          throw new Error(
            `${item.address} on chainId ${item.chainId} is not a valid ERC5169 token`
          )
        }
        return result
      })
    )
  )
})

test("all items in erc721.json should be ERC721 tokens", async (t) => {
  let jsonContent = ERC721_JSON_CONTENT
  if (fs.existsSync(path.join(__dirname, "../diff_erc721.json"))) {
    const diffErc721 = readJSONFile(path.join(__dirname, "../diff_erc721.json"))
    jsonContent = ERC721_JSON_CONTENT.filter((item) =>
      diffErc721.some(
        (d: any) => item.chainId === d.chainId && item.address === d.address
      )
    )
  }
  await t.notThrowsAsync(
    Promise.all(
      jsonContent.map(async (item: any) => {
        const result = await isERC721(item.chainId, item.address)
        if (!result) {
          throw new Error(
            `${item.address} on chainId ${item.chainId} is not a valid ERC721 token`
          )
        }
        return result
      })
    )
  )
})

test("all items in erc721.json should be ERC5169 tokens", async (t) => {
  let jsonContent = ERC721_JSON_CONTENT
  if (fs.existsSync(path.join(__dirname, "../diff_erc721.json"))) {
    const diffErc721 = readJSONFile(path.join(__dirname, "../diff_erc721.json"))
    jsonContent = ERC721_JSON_CONTENT.filter((item) =>
      diffErc721.some(
        (d: any) => item.chainId === d.chainId && item.address === d.address
      )
    )
  }
  await t.notThrowsAsync(
    Promise.all(
      jsonContent.map(async (item: any) => {
        const result = await isERC5169(item.chainId, item.address)
        if (!result) {
          throw new Error(
            `${item.address} on chainId ${item.chainId} is not a valid ERC5169 token`
          )
        }
        return result
      })
    )
  )
})

test("all items in erc1155.json should be ERC1155 tokens", async (t) => {
  let jsonContent = ERC1155_JSON_CONTENT
  if (fs.existsSync(path.join(__dirname, "../diff_erc1155.json"))) {
    const diffErc721 = readJSONFile(
      path.join(__dirname, "../diff_erc1155.json")
    )
    jsonContent = ERC1155_JSON_CONTENT.filter((item) =>
      diffErc721.some(
        (d: any) => item.chainId === d.chainId && item.address === d.address
      )
    )
  }
  await t.notThrowsAsync(
    Promise.all(
      jsonContent.map(async (item: any) => {
        const result = await isERC1155(item.chainId, item.address)
        if (!result) {
          throw new Error(
            `${item.address} on chainId ${item.chainId} is not a valid ERC1155 token`
          )
        }
        return result
      })
    )
  )
})

test("all items in erc1155.json should be ERC5169 tokens", async (t) => {
  let jsonContent = ERC1155_JSON_CONTENT
  if (fs.existsSync(path.join(__dirname, "../diff_erc1155.json"))) {
    const diffErc721 = readJSONFile(
      path.join(__dirname, "../diff_erc1155.json")
    )
    jsonContent = ERC1155_JSON_CONTENT.filter((item) =>
      diffErc721.some(
        (d: any) => item.chainId === d.chainId && item.address === d.address
      )
    )
  }
  await t.notThrowsAsync(
    Promise.all(
      jsonContent.map(async (item: any) => {
        const result = await isERC5169(item.chainId, item.address)
        if (!result) {
          throw new Error(
            `${item.address} on chainId ${item.chainId} is not a valid ERC5169 token`
          )
        }
        return result
      })
    )
  )
})
