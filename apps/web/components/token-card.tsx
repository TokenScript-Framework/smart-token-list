import { PolygonIcon } from "@/components/icons/polygon-icon"
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
import { FileCode2, Plus } from "lucide-react"

type TokenCardProps = React.ComponentProps<typeof Card>

const MOCK_CONTRACT = "0xd5ca946ac1c1f24eb26dae9e1a53ba6a02bd97fe"
export function TokenCard({ className, ...props }: TokenCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col gap-3 overflow-hidden rounded-[10px] bg-white p-4 pb-0 shadow dark:bg-[#0D0D0D]",
        className
      )}
      {...props}
    >
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Smart Cats</CardTitle>
            <CardDescription>by Smart Layer</CardDescription>
          </div>
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            ERC721
          </span>
        </div>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="bg-border my-4 h-[1px] w-full shrink-0"></div>
        <div className="flex flex-col gap-4">
          <SingleTokenCardInfo
            title={"Contract"}
            icon={<FileCode2 className="h-6 w-5 text-gray-400" />}
            content={shortenAddress(MOCK_CONTRACT)}
            contentTooltip={MOCK_CONTRACT}
            withCopy
          />

          <SingleTokenCardInfo
            title={"Contract"}
            icon={
              <PolygonIcon
                aria-hidden="true"
                className="h-5 w-5 rounded-full grayscale"
              />
            }
            content={"Polygon"}
            withCopy={false}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="text-primary w-full" variant="outline">
          <Plus className="text-primary mr-2 h-4 w-4" /> Add to Explorer
        </Button>
      </CardFooter>

      <h2 className="sr-only">Summary</h2>
      <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5"></div>
    </Card>
  )
}
