import { NextRequest, NextResponse } from "next/server"
import { pool } from "@/utils/db"
import jwt from "jsonwebtoken"

export async function GET(request: NextRequest) {
  try {
    // Get the token from cookies
    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Verify the token
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; email: string }
    
    // Fetch user data from database
    const [rows] = await pool.execute(
      `SELECT id, email, firstName, lastName, nickName, gender, country, timeZone, language, created_at 
       FROM users 
       WHERE id = ?`,
      [payload.id]
    )

    const users = rows as any[]
    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Return user data without sensitive information
    const user = users[0]
    return NextResponse.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      nickName: user.nickName,
      gender: user.gender,
      country: user.country,
      timeZone: user.timeZone,
      language: user.language,
      createdAt: user.created_at
    })
  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Get the token from cookies
    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Verify the token
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; email: string }
    
    // Get the updated profile data from the request body
    const data = await request.json()
    const { firstName, lastName, nickName, gender, country, timeZone, language } = data

    // Update user data in database
    await pool.execute(
      `UPDATE users 
       SET firstName = ?, lastName = ?, nickName = ?, gender = ?, country = ?, timeZone = ?, language = ?
       WHERE id = ?`,
      [firstName, lastName, nickName, gender, country, timeZone, language, payload.id]
    )

    return NextResponse.json({ message: "Profile updated successfully" })
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
} 