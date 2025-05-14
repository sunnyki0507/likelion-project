// import Navbar from "../(components)/NavBar"
// import type { ReactNode } from "react"

// export default function HomeLayout({ children }: { children: ReactNode }) {
//   return (
//     <div className="flex flex-col min-h-screen w-full">
//       <Navbar />
//       <main className="flex-grow w-full">{children}</main>
//       <footer className="border-t border-gray-200 py-6 w-full">
//         <div className="w-full px-4 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
//           <a href="#" className="hover:text-gray-900">
//             Help Center
//           </a>
//           <a href="#" className="hover:text-gray-900">
//             Terms of Service
//           </a>
//           <a href="#" className="hover:text-gray-900">
//             Privacy Policy
//           </a>
//           <a href="#" className="hover:text-gray-900">
//             Cookie Policy
//           </a>
//         </div>
//       </footer>
//     </div>
//   )
// }
import Navbar from "../(components)/NavBar"
import { FilterProvider } from "../(context)/FilterContext"
import { ViewProvider } from "../(context)/ViewContext"
import type { ReactNode } from "react"

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <FilterProvider>
      <ViewProvider>
        <div className="flex flex-col min-h-screen w-full">
          <Navbar />
          <main className="flex-grow w-full">{children}</main>
          <footer className="border-t border-gray-200 py-6 w-full">
            <div className="w-full px-4 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900">
                Help Center
              </a>
              <a href="#" className="hover:text-gray-900">
                Terms of Service
              </a>
              <a href="#" className="hover:text-gray-900">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-900">
                Cookie Policy
              </a>
            </div>
          </footer>
        </div>
      </ViewProvider>
    </FilterProvider>
  )
}
