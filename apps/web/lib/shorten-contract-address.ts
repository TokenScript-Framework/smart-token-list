export function shortenAddress(
  address: string,
  frontChars: number = 4,
  backChars: number = 4
): string {
  // Ensure the address is valid
  if (!address) return ""

  // Trim the address to the desired number of characters
  const prefix = address.slice(0, frontChars + 2)
  const suffix = address.slice(-backChars)

  return `${prefix}...${suffix}`
}
