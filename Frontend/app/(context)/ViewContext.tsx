"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type ViewMode = "card" | "list"

interface ViewContextType {
  viewMode: ViewMode
  toggleView: () => void
  setViewMode: (mode: ViewMode) => void
}

const ViewContext = createContext<ViewContextType | undefined>(undefined)

export function ViewProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>("card") // Default to card view

  const toggleView = () => {
    setViewMode((prev) => (prev === "card" ? "list" : "card"))
  }

  return <ViewContext.Provider value={{ viewMode, toggleView, setViewMode }}>{children}</ViewContext.Provider>
}

export function useView() {
  const context = useContext(ViewContext)
  if (context === undefined) {
    throw new Error("useView must be used within a ViewProvider")
  }
  return context
}
