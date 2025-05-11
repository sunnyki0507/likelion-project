"use client"

import { HeartIcon } from "@heroicons/react/24/solid"
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import type { RestaurantInfo } from "../(api)/getRestaurants"

export default function FavoriteCard({ restaurant }: { restaurant: RestaurantInfo }) {
  const [isFavorite, setIsFavorite] = useState(true)

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="w-full bg-white rounded-3xl shadow-md overflow-hidden mb-6">
      <div className="flex flex-row">
        {/* Left Content */}
        <div className="w-1/2 p-8 flex flex-col space-y-4">
          {/* Likes Counter */}
          <div className="flex items-center gap-2">
            <HeartIcon className="w-5 h-5 text-red-500" />
            <span className="font-medium">{restaurant.likes || 500}</span>
          </div>

          <h2 className="text-3xl font-bold">{restaurant.name}</h2>

          <div className="flex items-center gap-3">
            <span className="text-xl font-medium">{restaurant.rating}</span>
            <div className="flex items-center">
              <span className="text-yellow-400">{"★".repeat(Math.floor(restaurant.rating))}</span>
              <span className="text-gray-200">{"★".repeat(5 - Math.floor(restaurant.rating))}</span>
            </div>
            <span className="text-gray-500">({restaurant.reviews})</span>
            <span className="text-gray-500">{restaurant.distance}</span>
          </div>

          <Link href="#" className="text-blue-500 hover:underline">
            {restaurant.category}
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-green-500 font-medium">{restaurant.isOpen ? "Open" : "Closed"}</span>
            {restaurant.hasOnlineOrder && <span className="text-gray-500">• Order Online</span>}
          </div>

          <div className="flex flex-wrap gap-2">
            {restaurant.hasDelivery && (
              <span className="px-4 py-2 bg-gray-100 rounded-full text-sm">Offers Delivery</span>
            )}
            {restaurant.takesReservations && (
              <span className="px-4 py-2 bg-gray-100 rounded-full text-sm">Takes Reservations</span>
            )}
          </div>

          <button className="mt-2 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 w-fit">
            View More...
          </button>
        </div>

        {/* Right Image */}
        <div className="relative w-1/2">
          <Image
            src={restaurant.image || "/placeholder.svg"}
            alt={restaurant.name}
            fill
            className="object-cover"
            priority
          />
          <button onClick={toggleFavorite} className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md">
            {isFavorite ? (
              <HeartIcon className="w-6 h-6 text-red-500" />
            ) : (
              <HeartOutlineIcon className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
