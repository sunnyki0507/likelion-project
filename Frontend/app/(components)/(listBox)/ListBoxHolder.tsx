"use client"

import { useEffect, useState } from "react"
import type { RestaurantInfo } from "@/types/restaurant"
import { getRestaurants } from "@/app/(api)/getRestaurants"
import type { TagFilters } from "@/types/tags"
import ListBox from "./ListBox"
import FavoriteCardInfoPanel from "../(favoriteCard)/FavoriteCardInfoPanel"

interface ListBoxHolderProps {
  tagFilters: TagFilters
}

export default function ListBoxHolder({ tagFilters }: ListBoxHolderProps) {
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const [infoRestaurant, setInfoRestaurant] = useState<RestaurantInfo | null>(null)

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites)
        setFavorites(new Set(parsedFavorites))
      } catch (e) {
        console.error("Error parsing favorites from localStorage:", e)
      }
    }
  }, [])

  // Fetch restaurants based on tagFilters
  useEffect(() => {
    const fetchRestaurants = async () => {
      setIsLoading(true)
      const fetchedRestaurants = await getRestaurants({ tagFilters: tagFilters, size: 10, skip: 0 })
      setRestaurants(fetchedRestaurants)
      setIsLoading(false)
    }
    fetchRestaurants()
  }, [tagFilters])


  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl px-4 py-6">
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading restaurants...</p>
            </div>
          ) : (
            restaurants.map((restaurant) => (
              <div key={restaurant.id} className="flex justify-center">
                <ListBox
                  restaurantInfo={restaurant}
                  onViewMore={() => setInfoRestaurant(restaurant)}
                  infoPanelOpen={infoRestaurant?.id === restaurant.id}
                  onCloseInfo={() => setInfoRestaurant(null)}
                />
              </div>
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
    </div>
  )
}