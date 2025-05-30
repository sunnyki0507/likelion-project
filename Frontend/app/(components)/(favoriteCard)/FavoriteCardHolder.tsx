"use client"

import { useEffect, useState } from "react"
import FavoriteCard from "./FavoriteCard"
import type { RestaurantInfo } from "@/types/restaurant"
import FavoriteCardInfoPanel from "./FavoriteCardInfoPanel"
import { getFavoriteRestaurants } from "./SaveFavorite"

export default function FavoriteCardHolder() {
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([])
  const [infoRestaurant, setInfoRestaurant] = useState<RestaurantInfo | null>(null)

  useEffect(() => {
    const favorites = getFavoriteRestaurants();
    setRestaurants(favorites);
  }, []);

  return (
    <>
      <div className="w-full h-full overflow-y-auto flex flex-col px-4 py-8 max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Favorites</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No favorite restaurants yet</div>
          ) : (
            restaurants.map((restaurant) => (
              <FavoriteCard
                key={restaurant.id}
                restaurant={restaurant}
                onViewDetails={() => setInfoRestaurant(restaurant)}
              />
            ))
          )}
        </div>
      </div>
      {infoRestaurant && (
        <FavoriteCardInfoPanel
          restaurant={infoRestaurant}
          onClose={() => setInfoRestaurant(null)}
        />
      )}
    </>
  )
}
