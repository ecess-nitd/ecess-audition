import * as React from "react"

import { cn } from "@/lib/utils"
import { GlowingEffect } from "@/components/ui/glowing-effect"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (
      <>
    <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border-2 border-input my-1 px-3 py-2 text-base shadow-md transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props} />
      </>)
  );
})
Input.displayName = "Input"

export { Input }
