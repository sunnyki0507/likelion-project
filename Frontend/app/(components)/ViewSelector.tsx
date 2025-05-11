"use client"

import { useState } from "react"
import type { RestaurantInfo } from "../(api)/getRestaurants"
import type { ViewType } from "@/types/view"
import FavoriteCard from "./FavoriteCard"
import ViewToggle from "./ViewToggle"

export default function ViewSelector({ initRestaurants }: { initRestaurants: RestaurantInfo[] }) {
  const [currentView, setCurrentView] = useState<ViewType>("Card")
  const [restaurants] = useState<RestaurantInfo[]>(initRestaurants)

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view)
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Favorites</h1>
        <ViewToggle currentView={currentView} onViewChange={handleViewChange} />
      </div>

      <div className="space-y-6 w-full">
        {currentView === "Card" ? (
          restaurants.map((restaurant) => <FavoriteCard key={restaurant.id} restaurant={restaurant} />)
        ) : (
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-500">List view coming soon...</p>
          </div>
        )}
      </div>
    </div>
  )
}
