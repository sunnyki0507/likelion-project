import HomeLayout from "../home/layout"
import type { ReactNode } from "react"

export default function FavoritesLayout({ children }: { children: ReactNode }) {
  return <HomeLayout>{children}</HomeLayout>
}
