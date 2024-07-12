import fs from "fs"
import path from "path"
import { __dirname, readAllTokens } from "./utils"

function main() {
  fs.writeFileSync(
    path.join(__dirname, "./tokens.json"),
    JSON.stringify(readAllTokens(), null, 2)
  )
}

main()
