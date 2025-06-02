import { NextRequest, NextResponse } from "next/server"
import { pool } from "@/utils/db"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const [rows] = await pool.execute(
      `SELECT DISTINCT r.*, f.restaurant_name 
       FROM restaurants r
       INNER JOIN favorites f ON r.id = f.restaurant_id
       WHERE f.user_id = ?
       GROUP BY r.id, r.name, r.rating, r.reviews, r.distance, r.category, 
                r.isOpen, r.hasOnlineOrder, r.hasDelivery, r.takesReservations,
                r.image, r.likes, r.description, f.restaurant_name`,
      [userId]
    )

    // Round the rating to 1 decimal place for each restaurant
    const favorites = (rows as any[]).map(restaurant => ({
      ...restaurant,
      rating: restaurant.rating ? Number(restaurant.rating.toFixed(1)) : null
    }))

    return NextResponse.json({ favorites })
  } catch (err) {
    console.error("❌ Error fetching favorites:", err)
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 })
  }
}