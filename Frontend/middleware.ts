import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function middleware(req: NextRequest) {
  console.log("✅ middleware is running")

  const token = req.cookies.get("token")?.value

  if (!token) {
    console.log("⛔ No token found")
    return NextResponse.redirect(new URL("/login", req.url))
  }

  try {
    // ✅ jose-based verification
    await jwtVerify(token, secret)
    return NextResponse.next()
  } catch (err) {
    console.log("⛔ Invalid or expired token:", err)
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

export const config = {
  matcher: ["/home/:path*", "/favorites/:path*"],
}
