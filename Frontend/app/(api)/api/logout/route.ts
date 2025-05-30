import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({ success: true })
  
  // Clear the token cookie
  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0), // Set expiration to the past to delete the cookie
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
  
  return response
} 