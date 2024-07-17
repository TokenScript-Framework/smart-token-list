import { SingleTokenCardInfo } from "@/components/single-token-card-info"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { shortenAddress } from "@/lib/shorten-contract-address"
import { cn } from "@/lib/utils"
import { CHAIN_ID_MAP, TokenInfo } from "@repo/smart-token-list"
import { DollarSign, FileCode2, Link, Plus } from "lucide-react"
import toast from "react-hot-toast"

type TokenCardProps = {
  tokenInfo: TokenInfo
  className?: string
}

export function TokenCard({ className, ...props }: TokenCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col gap-3 overflow-hidden rounded-[10px] bg-white p-4 pb-0 shadow dark:bg-[#0D0D0D]",
        className
      )}
    >
      <CardHeader className="pb-0">
        <div className="">
          <div className="flex w-full items-center justify-between">
            <CardTitle>{props.tokenInfo.name}</CardTitle>
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              {props.tokenInfo.type.toUpperCase()}
            </span>
          </div>
          <CardDescription className="mt-2 line-clamp-4 text-left text-gray-400">
            {/* @ts-ignore */}
            {props.tokenInfo?.description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="bg-border my-4 h-px w-full shrink-0"></div>
        <div className="flex flex-col gap-4">
          <SingleTokenCardInfo
            title={"Contract"}
            icon={<FileCode2 className="h-6 w-5 text-gray-400" />}
            content={shortenAddress(props.tokenInfo.address)}
            contentTooltip={props.tokenInfo.address}
            withCopy
          />

          {props.tokenInfo.type === "erc20" && (
            <SingleTokenCardInfo
              title={"Symbol"}
              icon={<DollarSign className="h-6 w-5 text-gray-400" />}
              content={props.tokenInfo.symbol}
              withCopy={false}
            />
          )}

          <SingleTokenCardInfo
            title={"Chain"}
            icon={<Link className="h-6 w-5 text-gray-400" />}
            content={CHAIN_ID_MAP[props.tokenInfo.chainId]?.name || ""}
            tailContent={props.tokenInfo.chainId.toString()}
            tailContentTooltip="Chain Id"
            withCopy={false}
          />
        </div>
      </CardContent>

      <CardFooter>
        {/* <Button className="text-primary w-full" variant="outline" asChild>
          <a
            href={`https://www.tantantodo.com/?chain=${props.tokenInfo.chainId}&contract=${props.tokenInfo.address}&type=${props.tokenInfo.type}`}
            target="_blank"
          >
            <Plus className="text-primary mr-2 size-4" /> Add to Explorer
          </a>
        </Button> */}

        <Button
          className="text-primary w-full"
          variant="outline"
          onClick={() => {
            toast("Coming soon!", { icon: "⏳" })
          }}
        >
          <Plus className="text-primary mr-2 size-4" /> Add to Explorer
        </Button>
      </CardFooter>

      <h2 className="sr-only">Summary</h2>
      <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5"></div>
    </Card>
  )
}
