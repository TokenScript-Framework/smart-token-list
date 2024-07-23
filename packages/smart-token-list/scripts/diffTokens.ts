import { execSync } from "child_process"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

// fix __dirname is not defined in ES module scope
const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

const targetBranch = process.env.GITHUB_BASE_REF ?? "HEAD"

function getDiffList(paths: string[]) {
  return paths
    .map((p) => {
      const currentJson = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../../../", p), "utf-8")
      )
      try {
        const oldContent = execSync(`git show ${targetBranch}:${p}`, {
          encoding: "utf-8",
        })
        const oldJson = JSON.parse(oldContent)
        return currentJson.filter(
          (item: any) =>
            !oldJson.some(
              (old: any) =>
                old.address === item.address && old.chainId === item.chainId
            )
        )
      } catch (err) {
        // so this is a new file
        return currentJson
      }
    })
    .flat()
}

function diffTokens() {
  const changedFiles = execSync(
    `git diff ${targetBranch} --diff-filter=AM --name-only`,
    { encoding: "utf-8" }
  )
    .split("\n")
    .filter(Boolean)
  const erc20Tokens = changedFiles.filter((f) => f.endsWith("erc20.json"))
  const erc721Tokens = changedFiles.filter((f) => f.endsWith("erc721.json"))
  const erc1155Tokens = changedFiles.filter((f) => f.endsWith("erc1155.json"))
  console.log(`Changed ERC20 tokens: ${erc20Tokens}`)
  console.log(`Changed ERC721 tokens: ${erc20Tokens}`)
  console.log(`Changed ERC1155 tokens: ${erc20Tokens}`)
  const erc20DiffTokens = getDiffList(erc20Tokens)
  const erc721DiffTokens = getDiffList(erc721Tokens)
  const erc1155DiffTokens = getDiffList(erc1155Tokens)
  console.log("erc20DiffTokens:")
  console.log(erc20DiffTokens)
  console.log("erc721DiffTokens:")
  console.log(erc721DiffTokens)
  console.log("erc1155DiffTokens:")
  console.log(erc1155DiffTokens)
  fs.writeFileSync(
    path.join(__dirname, "../diff_erc20.json"),
    JSON.stringify(erc20DiffTokens, null, 2)
  )
  fs.writeFileSync(
    path.join(__dirname, "../diff_erc721.json"),
    JSON.stringify(erc721DiffTokens, null, 2)
  )
  fs.writeFileSync(
    path.join(__dirname, "../diff_erc1155.json"),
    JSON.stringify(erc1155DiffTokens, null, 2)
  )
}

function main() {
  diffTokens()
}

main()
