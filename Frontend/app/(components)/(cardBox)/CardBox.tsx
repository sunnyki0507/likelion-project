"use client"

import { RestaurantInfo } from "@/types/restaurant"
import { HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function CardBox({ restaurantInfo }: { restaurantInfo: RestaurantInfo }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const restaurant = restaurantInfo

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="w-[870px] h-[500px] mx-auto bg-white rounded-3xl shadow-lg mb-6 overflow-hidden">
      <div className="flex flex-row">
        {/* Left Content */}
        <div className="flex-1 p-8 space-y-6">
          {/* Likes Counter */}
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 shadow-sm border">
            <HeartIcon className="w-4 h-4 text-red-700" />
            <span>{restaurant.likes}</span>
          </div>

          <h2 className="text-4xl font-bold">{restaurant.name}</h2>

          <div className="flex items-center gap-3">
            <span className="text-xl">{restaurant.rating}</span>
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
              <span className="px-4 py-2 bg-gray-200 rounded-full text-sm">Offers Delivery</span>
            )}
            {restaurant.takesReservations && (
              <span className="px-4 py-2 bg-gray-200 rounded-full text-sm">Takes Reservations</span>
            )}
          </div>

          <p className="text-gray-600">{restaurant.description || "Description about the restaurant"}</p>

          <button className="mt-4 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-900 flex items-center gap-2">
            View More...
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Right Image */}
        <div className="relative w-[500px] aspect-square">
          <Image
            src={restaurant.image || "/placeholder.svg?height=500&width=500&query=restaurant"}
            alt={restaurant.name}
            fill
            className="object-cover"
            priority
          />
          <button
            onClick={toggleFavorite}
            className="absolute top-4 right-4 p-3 hover:bg-gray-100/90 rounded-full bg-white shadow-md"
          >
            {isFavorite ? (
              <HeartSolidIcon className="w-6 h-6 text-red-500" />
            ) : (
              <HeartIcon className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
