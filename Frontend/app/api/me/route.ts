// app/api/me/route.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export async function GET(request: NextRequest) {
  // grab the cookie
  const token = request.cookies.get("token")?.value
  if (!token) {
    return NextResponse.json({ user: null })
  }

  try {
    // verify it’s still valid
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; email: string }
    return NextResponse.json({ user: payload })
  } catch {
    // expired or tampered
    return NextResponse.json({ user: null })
  }
}
