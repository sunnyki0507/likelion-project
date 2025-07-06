import { NextRequest, NextResponse } from "next/server"
import { pool } from "@/utils/db"

// POST: Add a favorite (ensure restaurant exists, then link user to restaurant)
export async function POST(req: NextRequest) {
  try {
    const { userId, restaurant } = await req.json()
    console.log("Received favorite request:", { userId, restaurant })

    const {
      id,
      name,
      rating,
      reviews,
      distance,
      category,
      isOpen,
      hasOnlineOrder,
      hasDelivery,
      takesReservations,
      image,
      likes,
      description
    } = restaurant

    // Convert undefined values to null and round rating to 1 decimal place
    const restaurantData = [
      id,
      name,
      rating ? Number(rating.toFixed(1)) : null,
      reviews ?? null,
      distance ?? null,
      category ?? null,
      isOpen ?? null,
      hasOnlineOrder ?? null,
      hasDelivery ?? null,
      takesReservations ?? null,
      image ?? null,
      likes ?? null,
      description ?? null
    ]

    // 1. Insert or update restaurant info
    console.log("Attempting to insert/update restaurant:", { id, name })
    const [restaurantResult] = await pool.execute(
      `INSERT INTO restaurants (id, name, rating, reviews, distance, category, isOpen, hasOnlineOrder, hasDelivery, takesReservations, image, likes, description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         name=VALUES(name), rating=VALUES(rating), reviews=VALUES(reviews), distance=VALUES(distance),
         category=VALUES(category), isOpen=VALUES(isOpen), hasOnlineOrder=VALUES(hasOnlineOrder),
         hasDelivery=VALUES(hasDelivery), takesReservations=VALUES(takesReservations),
         image=VALUES(image), likes=VALUES(likes), description=VALUES(description)`,
      restaurantData
    )
    console.log("Restaurant insert/update result:", restaurantResult)

    // 2. Link user to restaurant in favorites
    console.log("Attempting to link user to restaurant:", { userId, restaurantId: id, restaurantName: name })
    const [favoriteResult] = await pool.execute(
      `INSERT IGNORE INTO favorites (user_id, restaurant_id, restaurant_name) VALUES (?, ?, ?)`,
      [userId, id, name]
    )
    console.log("Favorite link result:", favoriteResult)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("❌ Error saving favorite:", err)
    return NextResponse.json({ success: false, error: "Failed to save favorite" }, { status: 500 })
  }
}

// DELETE: Remove a favorite
export async function DELETE(req: NextRequest) {
  try {
    const { userId, restaurantId, restaurantName } = await req.json()
    console.log("Received unfavorite request:", { userId, restaurantId, restaurantName })

    const [result] = await pool.execute(
      `DELETE FROM favorites WHERE user_id = ? AND restaurant_id = ? AND restaurant_name = ?`,
      [userId, restaurantId, restaurantName]
    )
    console.log("Unfavorite result:", result)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("❌ Error removing favorite:", err)
    return NextResponse.json({ success: false, error: "Failed to remove favorite" }, { status: 500 })
  }
}