import type { ReactNode } from "react"

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* You can include navbars, sidebars, etc. here */}
      {children}
    </div>
  )
}