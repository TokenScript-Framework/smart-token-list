import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SMART_TOKEN_LIST } from "@repo/smart-token-list"
import Image from "next/image"

export default function Page(): JSX.Element {
  return (
    <main
      className={cn(
        "flex min-h-screen flex-col items-center justify-between p-24"
      )}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="">
          examples/with-tailwind -&nbsp;
          <code className="font-mono font-bold">web</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-black via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"
            rel="noopener noreferrer"
            target="_blank"
          >
            By{" "}
            <Image
              alt="Vercel Logo"
              className="invert"
              height={24}
              priority
              src="/vercel.svg"
              width={100}
            />
          </a>
        </div>
      </div>

      <h1>{JSON.stringify(SMART_TOKEN_LIST)}</h1>
      <Button variant="outline">hello shadcn/ui</Button>
    </main>
  )
}
