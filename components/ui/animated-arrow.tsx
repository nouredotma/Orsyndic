import { ArrowUpRight } from "lucide-react"

interface AnimatedArrowProps {
  wrapperClassName?: string
  arrowClassName?: string
}

export function AnimatedArrow({ wrapperClassName = "bg-white", arrowClassName = "text-black" }: AnimatedArrowProps) {
  return (
    <div className={`relative flex items-center justify-center w-7 h-7 md:w-9 md:h-9 rounded-full overflow-hidden shrink-0 ${wrapperClassName}`}>
      {/* First Arrow (visible initially, moves top right on hover) */}
      <ArrowUpRight 
        className={`w-4 h-4 md:w-5 md:h-5 absolute transition-transform duration-300 ease-in-out group-hover:translate-x-[150%] group-hover:-translate-y-[150%] ${arrowClassName}`} 
        strokeWidth={2}
      />
      {/* Second Arrow (hidden initially bottom left, moves to center on hover) */}
      <ArrowUpRight 
        className={`w-4 h-4 md:w-5 md:h-5 absolute -translate-x-[150%] translate-y-[150%] transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 ${arrowClassName}`} 
        strokeWidth={2}
      />
    </div>
  )
}
