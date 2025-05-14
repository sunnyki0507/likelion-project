// import { getRestaurants } from "../(api)/getRestaurants"
// import CardBoxHolder from "../(components)/CardBoxHolder"
// import type { TagFilters } from "../../types/tags"

// const sampleTagFilters: TagFilters = {
//   location: "irvine",
//   category: "Thai",
//   distance: 5,
//   ratings: 4,
//   delivery: true,
//   vegan: false,
// }

// export default async function HomePage() {
//   const restaurants = await getRestaurants({ tagFilters: sampleTagFilters, size: 5 })

//   // Add sample data to match the design
//   const enhancedRestaurants = restaurants.map((restaurant) => ({
//     ...restaurant,
//     likes: restaurant.likes || 500,
//     reviews: restaurant.reviews || 292,
//     distance: restaurant.distance || "2.4km",
//     description: "Description about the restaurant",
//   }))

//   return (
//     <div className="w-full h-[calc(100vh-132px)]">
//       <CardBoxHolder initRestaurants={enhancedRestaurants} />
//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { getRestaurants } from "../(api)/getRestaurants"
import CardBoxHolder from "../(components)/CardBoxHolder"
import RestaurantListView from "../(components)/RestaurantListView"
import { useView } from "../(context)/ViewContext"
import type { RestaurantInfo } from "../(api)/getRestaurants"
import type { TagFilters } from "../../types/tags"

export default function HomePage() {
  const { viewMode } = useView()
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRestaurants() {
      setLoading(true)
      try {
        const tagFilters: TagFilters = {
          location: "irvine",
          category: "Thai",
          distance: 5,
          ratings: 4,
          delivery: true,
          vegan: false,
        }

        const data = await getRestaurants({ tagFilters, size: 5 })

        // Add sample data to match the design
        const enhancedRestaurants = data.map((restaurant) => ({
          ...restaurant,
          likes: restaurant.likes || 500,
          reviews: restaurant.reviews || 292,
          distance: restaurant.distance || "2.4km",
          description: "Description about the restaurant",
        }))

        setRestaurants(enhancedRestaurants)
      } catch (error) {
        console.error("Failed to load restaurants:", error)
      } finally {
        setLoading(false)
      }
    }

    loadRestaurants()
  }, [])

  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-132px)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <>
      {viewMode === "card" ? (
        <div className="w-full h-[calc(100vh-132px)]">
          <CardBoxHolder initRestaurants={restaurants} />
        </div>
      ) : (
        <div className="w-full px-4 py-8 max-w-screen-xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Restaurants Near You</h1>
          <div>
            {restaurants.map((restaurant) => (
              <RestaurantListView key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
