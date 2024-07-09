/** @type {import('prettier').Config} */
module.exports = {
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  plugins: [
    // comment for better diff
    "prettier-plugin-organize-imports",
    "prettier-plugin-tailwindcss",
  ],
}
