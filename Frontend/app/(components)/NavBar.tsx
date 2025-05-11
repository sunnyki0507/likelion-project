// "use client"

// import Image from "next/image"
// import Link from "next/link"
// import { usePathname } from "next/navigation"

// export default function Navbar() {
//   const pathname = usePathname()

//   const isActive = (path: string) => {
//     return pathname === path
//   }

//   return (
//     <header className="border-b border-gray-200">
//       <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
//         <Link href="/home" className="flex items-center">
//           <Image
//             src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BAPAGO-logo-wsQQFiikb4EGqWocDpua8LJOvF5fj9.png"
//             alt="BAPAGO Logo"
//             width={120}
//             height={40}
//             className="h-10 w-auto"
//           />
//         </Link>

//         <nav className="hidden md:flex items-center space-x-8">
//           <Link
//             href="/favorites"
//             className={`font-medium ${isActive("/favorites") ? "text-black" : "text-gray-600 hover:text-black"}`}
//           >
//             Favorites
//           </Link>
//           <Link
//             href="/customize"
//             className={`font-medium ${isActive("/customize") ? "text-black" : "text-gray-600 hover:text-black"}`}
//           >
//             Customize
//           </Link>
//           <Link
//             href="/change-view"
//             className={`font-medium ${isActive("/change-view") ? "text-black" : "text-gray-600 hover:text-black"}`}
//           >
//             Change view
//           </Link>
//           <Link
//             href="/profile"
//             className={`font-medium ${isActive("/profile") ? "text-black" : "text-gray-600 hover:text-black"}`}
//           >
//             Profile
//           </Link>
//         </nav>

//         <div className="flex items-center space-x-4">
//           <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//               <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
//             </svg>
//           </Link>
//           <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//               <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
//             </svg>
//           </Link>
//           <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//               <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
//             </svg>
//           </Link>
//         </div>
//       </div>
//     </header>
//   )
// }
"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="border-b border-gray-200 w-full">
      <div className="w-full px-4 py-4 flex justify-between items-center">
        <Link href="/home" className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BAPAGO-logo-wsQQFiikb4EGqWocDpua8LJOvF5fj9.png"
            alt="BAPAGO Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/favorites"
            className={`font-medium ${isActive("/favorites") ? "text-black" : "text-gray-600 hover:text-black"}`}
          >
            Favorites
          </Link>
          <Link
            href="/customize"
            className={`font-medium ${isActive("/customize") ? "text-black" : "text-gray-600 hover:text-black"}`}
          >
            Customize
          </Link>
          <Link
            href="/change-view"
            className={`font-medium ${isActive("/change-view") ? "text-black" : "text-gray-600 hover:text-black"}`}
          >
            Change view
          </Link>
          <Link
            href="/profile"
            className={`font-medium ${isActive("/profile") ? "text-black" : "text-gray-600 hover:text-black"}`}
          >
            Profile
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
            </svg>
          </Link>
          <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
            </svg>
          </Link>
          <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  )
}
