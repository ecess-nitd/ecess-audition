"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

const domains = [
  { display: "Web", value: "Web Development" },
  { display: "Embedded", value: "Embedded Systems" },
  { display: "Event", value: "Event Management" },
  { display: "Video", value: "Video Editing" },
  { display: "Graphics", value: "Graphic Designing" }
]

export function MultiSelect({ value, onChange, placeholder = "Select domains..." }) {
  const [open, setOpen] = React.useState(false)

  const handleUnselect = (item) => {
    onChange(value.filter((i) => i !== item))
  }

  const handleSelect = (domain) => {
    if (value.length >= 2 && !value.includes(domain)) {
      return // Don't allow more than 2 domains
    }
    onChange(
      value.includes(domain)
        ? value.filter((item) => item !== domain)
        : [...value, domain]
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex h-10 w-full rounded-lg border-2 border-white bg-black/50 text-white hover:bg-gray-800/50 hover:text-white justify-between px-3 py-2 text-base shadow-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        >
          <div className="flex gap-1 flex-wrap">
            {value.length === 0 && <span className="text-gray-400">{placeholder}</span>}
            {value.map((item) => {
              const domain = domains.find(d => d.value === item);
              return (
                <Badge
                  variant="secondary"
                  key={item}
                  className="mr-1 mb-1 bg-gray-800 text-white border-white hover:bg-gray-700"
                >
                  {domain ? domain.display : item}
                  <span
                    className="ml-1 cursor-pointer hover:text-gray-300"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleUnselect(item)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </span>
                </Badge>
              );
            })}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-black border-2 border-white z-50">
        <Command className="bg-black text-white">
          <CommandInput placeholder="Search domains..." className="text-white placeholder:text-gray-400 border-none focus:ring-0" />
          <CommandList className="max-h-48 overflow-y-auto">
            <CommandEmpty>No domain found.</CommandEmpty>
            <CommandGroup>
              {domains.map((domain) => (
                <CommandItem
                  key={domain.value}
                  onSelect={() => handleSelect(domain.value)}
                  className="text-white hover:bg-gray-800 focus:bg-gray-800 cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(domain.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {domain.value}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
