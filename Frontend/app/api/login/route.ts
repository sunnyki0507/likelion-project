// app/api/login/route.ts
import { NextResponse } from "next/server"
import { logIn } from "../auth"

export async function POST(request: Request) {
  const { email, password } = await request.json()
  const result = await logIn(email, password)

  if (!result.success || !result.token) {
    return NextResponse.json({ error: result.error || "No token" }, { status: 401 })
  }

  // Now TS knows `token` is a string, not `undefined`
  const token = result.token

  const res = NextResponse.json({ user: result.user })
  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60,         // 1 hour
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
  return res
}
