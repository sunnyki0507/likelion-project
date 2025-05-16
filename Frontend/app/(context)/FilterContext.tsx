"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { TagFilters } from "@/types/tags"

interface FilterContextType {
  filters: TagFilters
  updateFilters: (newFilters: Partial<TagFilters>) => void
  resetFilters: () => void
}

const defaultFilters: TagFilters = {
  location: "irvine",
  category: "",
  distance: 10,
  ratings: 0,
  delivery: false,
  vegan: false,
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<TagFilters>(defaultFilters)

  const updateFilters = (newFilters: Partial<TagFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const resetFilters = () => {
    setFilters(defaultFilters)
  }

  return <FilterContext.Provider value={{ filters, updateFilters, resetFilters }}>{children}</FilterContext.Provider>
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider")
  }
  return context
}
