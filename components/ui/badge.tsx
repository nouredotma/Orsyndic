import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-neutral-200 text-neutral-600 hover:bg-neutral-200/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success:
          "border-transparent bg-[#00D100]/15 text-[#00D100] hover:bg-[#00D100]/25",
        warning:
          "border-transparent bg-amber-100 text-amber-600 hover:bg-amber-200",
        danger:
          "border-transparent bg-[#FF0000]/15 text-[#FF0000] hover:bg-[#FF0000]/25",
        info: "border-transparent bg-blue-100 text-blue-600 hover:bg-blue-200",
        orange:
          "border-transparent bg-orange-100 text-orange-600 hover:bg-orange-200",
        tenant:
          "border-transparent bg-purple-100 text-purple-600 hover:bg-purple-200",
        admin: "border-transparent bg-neutral-200 text-black hover:bg-neutral-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
