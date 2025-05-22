import HomeLayout from "../layout"
import type { ReactNode } from "react"

export default function CustomizeLayout({ children }: { children: ReactNode }) {
  return <HomeLayout>{children}</HomeLayout>
}
