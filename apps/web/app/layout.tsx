import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"

import { TailwindIndicator } from "@/components/tailwind-indicator"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Smart Token List",
  description: "Find the Smart Tokens powered by ERC5169",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <TailwindIndicator />
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
