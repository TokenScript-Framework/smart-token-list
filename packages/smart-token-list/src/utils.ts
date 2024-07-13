import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { Erc1155, Erc20, Erc721, TokenInfo } from "./types"

// fix __dirname is not defined in ES module scope
const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

export const BASE_PATH = path.join(__dirname, "./chain/")

export function readJSONFile(filePath: string | Buffer) {
  const file = fs.readFileSync(filePath, "utf8")
  return JSON.parse(file)
}

export function readAllJsonFilesUnderDir(
  dirPath: string
): Omit<TokenInfo, "type">[] {
  return fs
    .readdirSync(dirPath)
    .filter((f) => f.toString().endsWith(".json"))
    .map((p) => readJSONFile(path.join(dirPath, p.toString())))
    .flat()
}

export function readAllERC20Files(): Omit<Erc20, "type">[] {
  return fs
    .readdirSync(BASE_PATH, { recursive: true })
    .filter((f) => f.toString().endsWith("erc20.json"))
    .map((p) => readJSONFile(path.join(BASE_PATH, p.toString())))
    .flat()
}

export function readAllERC721Files(): Omit<Erc721, "type">[] {
  return fs
    .readdirSync(BASE_PATH, { recursive: true })
    .filter((f) => f.toString().endsWith("erc721.json"))
    .map((p) => readJSONFile(path.join(BASE_PATH, p.toString())))
    .flat()
}

export function readAllERC1155Files(): Omit<Erc1155, "type">[] {
  return fs
    .readdirSync(BASE_PATH, { recursive: true })
    .filter((f) => f.toString().endsWith("erc1155.json"))
    .map((p) => readJSONFile(path.join(BASE_PATH, p.toString())))
    .flat()
}

export function readAllTokens(): TokenInfo[] {
  return [
    ...readAllERC20Files().map((item) => {
      return { ...item, type: "erc20" } as Erc20
    }),
    ...readAllERC721Files().map((item) => {
      return { ...item, type: "erc721" } as Erc721
    }),
    ...readAllERC1155Files().map((item) => {
      return { ...item, type: "erc1155" } as Erc1155
    }),
  ].flat()
}
