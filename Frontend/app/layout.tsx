// import type { Metadata } from "next";
// import { Poppins } from "next/font/google";
// import "./globals.css";


// const poppins = Poppins({
//   subsets: ['latin'],
//   weight: ['400', '500','600','700'], 
//   variable: '--font-poppins',
//   display: 'swap',
// });


// export const metadata: Metadata = {
//   title: "BAPAGO - Restaurant Finder",
//   description: "Find and order from restaurants near you",
// };



// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className='w-full h-full'>
//       <body
//         className={`${poppins.variable} font-[poppins] antialiased w-full h-full flex`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }
import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "BAPAGO - Restaurant Finder",
  description: "Find and order from restaurants near you",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="w-full h-full">
      <body className={`${poppins.variable} font-[poppins] antialiased w-full h-full`}>{children}</body>
    </html>
  )
}
