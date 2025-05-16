"use client"

import { useEffect, useState } from "react"
import { getRestaurants } from "../../(api)/getRestaurants"
import RestaurantCard from "../RestaurantCard"
import type { TagFilters } from "../../../types/tags"
import type { RestaurantInfo } from "@/types/restaurant"

const sampleTagFilters: TagFilters = {
  location: "irvine",
  category: "",
  distance: "10km",
  ratings: 0,
  delivery: false,
  vegan: false,
  likes: 0,
  reviews: 0,
  description: "",
}

export default function FavoriteCardHolder() {
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await getRestaurants({ tagFilters: sampleTagFilters, size: 10 })
        setRestaurants(data)
      } catch (error) {
        console.error("Failed to load restaurants:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadRestaurants()
  }, [])

  return (
    <div className="w-full px-4 py-8 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Favorites</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Show loading skeleton
          [...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-64"></div>
          ))
        ) : (
          restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))
        )}
      </div>
    </div>
  )
}
