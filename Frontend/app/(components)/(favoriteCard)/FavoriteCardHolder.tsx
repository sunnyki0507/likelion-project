"use client"

import { useEffect, useState } from "react"
//import { getRestaurants } from "../../(api)/getRestaurants"
import RestaurantCard from "../RestaurantCard"
//import type { TagFilters } from "../../../types/tags"
import type { RestaurantInfo } from "@/types/restaurant"
import { AnimatePresence } from "framer-motion"
import { getUserFromToken } from "@/utils/auth"

/*const sampleTagFilters: TagFilters = {
  location: "irvine",
  category: "",
  distance: "10km",
  ratings: 0,
  delivery: false,
  vegan: false,
  likes: 0,
  reviews: 0,
  description: "",
}*/

export default function FavoriteCardHolder() {
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
  const loadFavorites = async () => {
    const user = await getUserFromToken();
    if (user) {
      const res = await fetch(`/api/fetchFavorites?userId=${user.id}`);
      const data = await res.json();
      setRestaurants(data.favorites);
    } else {
      const stored = localStorage.getItem("favorites");
      if (stored) setRestaurants(JSON.parse(stored));
    }
    setIsLoading(false);
  };
  loadFavorites();
}, []);

  //  Function to remove favorite and update localStorage
  const removeFavorite = (id: string) => {
    const updated = restaurants.filter((r) => r.id !== id)
    setRestaurants(updated)
    localStorage.setItem("favorites", JSON.stringify(updated))
  }

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
          <AnimatePresence mode="popLayout">
            {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onUnfavorite={removeFavorite}
              isFavoriteView={true}
          />
        ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
