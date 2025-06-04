"use client"

import { RestaurantInfo } from "@/types/restaurant"
import { HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { saveFavoriteRestaurant, deleteFavoriteRestaurant, getFavoriteRestaurants } from "../(favoriteCard)/SaveFavorite"
import CardBoxInfoPanel from "../(cardBox)/CardBoxInfoPanel"

interface CardBoxProps {
  restaurantInfo: RestaurantInfo
  onViewMore: () => void
  infoPanelOpen: boolean
  onCloseInfo: () => void
}

export default function ListBox({ restaurantInfo, onViewMore, infoPanelOpen, onCloseInfo }: CardBoxProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const restaurant = restaurantInfo

  // Check if restaurant is in favorites on component mount
  useEffect(() => {
    const favorites = getFavoriteRestaurants();
    setIsFavorite(favorites.some(fav => fav.id === restaurant.id));
  }, [restaurant.id]);

  // Dummy data for menus, images, and reviews (replace with real data as needed)
  const menus = [
    { name: "Menu Name", img: "/images/sample-menu.jpg" },
    { name: "Menu Name", img: "/images/sample-menu.jpg" },
    { name: "Menu Name", img: "/images/sample-menu.jpg" },
  ]
  const images = [
    "/images/sample-menu.jpg",
    "/images/sample-menu.jpg",
    "/images/sample-menu.jpg",
    "/images/sample-menu.jpg",
    "/images/sample-menu.jpg",
    "/images/sample-menu.jpg",
  ]
  const reviews = [
    {
      user: "John D.",
      rating: 4,
      text:
        "Nice burgers but they don't look like the pictures on the website! I had the teriyaki char burger and enjoyed the flavors but couldn't taste teriyaki. My girlfriend had the garden salad without tomato and said it was worth every penny ($3) we also had sweet potato fries which was good not incredible or anything. They sadly forgot to put one extra side of sauce in our bag since we ordered online. Willing to try it again!",
    },
    {
      user: "John D.",
      rating: 4,
      text:
        "Nice burgers but they don't look like the pictures on the website! I had the teriyaki char burger and enjoyed the flavors but couldn't taste teriyaki. My girlfriend had the garden salad without tomato and said it was worth every penny ($3) we also had sweet potato fries which was good not incredible or anything. They sadly forgot to put one extra side of sauce in our bag since we ordered online. Willing to try it again!",
    },
  ]

  const toggleFavorite = () => {
    if (!isFavorite) {
      saveFavoriteRestaurant(restaurant);
    } else {
      deleteFavoriteRestaurant(restaurant.id);
    }
    setIsFavorite(!isFavorite);
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full max-w-4xl">
        <div className="flex flex-col md:flex-row">
          {/* Restaurant Image Section with Heart */}
          <div className="relative h-40 md:h-auto md:w-64 flex-shrink-0">
            <Image
              src={restaurantInfo.image || "/placeholder.svg?height=200&width=200&query=restaurant food"}
              alt={restaurantInfo.name}
              fill
              className="object-cover"
              priority
            />

            {/* Heart Button */}
            <button
              onClick={toggleFavorite}
              className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <HeartIcon
                className={`w-5 h-5 transition-colors ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"}`}
              />
            </button>
          </div>

          {/* Restaurant Information */}
          <div className="flex-1 p-4 md:p-6">
            <div className="flex flex-col h-full">
              {/* Restaurant name */}
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{restaurantInfo.name}</h2>

              {/* Rating and reviews */}
              <div className="flex items-center mb-2">
                <span className="text-lg font-semibold mr-2">{restaurantInfo.rating}</span>
                <div className="flex items-center mr-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${i < Math.floor(restaurantInfo.rating) ? "text-yellow-400" : "text-gray-200"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-500 text-sm">({restaurantInfo.reviews})</span>
                <span className="text-gray-300 mx-2">•</span>
                <span className="text-gray-500 text-sm">{restaurantInfo.distance}</span>
              </div>

              {/* Category */}
              <div className="mb-3">
                <span className="text-blue-500 hover:text-blue-600 font-medium cursor-pointer">
                  {restaurantInfo.category}
                </span>
              </div>

              {/* Status */}
              <div className="mb-4">
                <span className={`font-medium ${restaurantInfo.isOpen ? "text-green-600" : "text-red-600"}`}>
                  {restaurantInfo.isOpen ? "Open" : "Closed"}
                </span>
                {restaurantInfo.hasOnlineOrder && <span className="text-gray-500 ml-2">• Order Online</span>}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {restaurantInfo.hasDelivery && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Offers Delivery</span>
                )}
                {restaurantInfo.takesReservations && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Takes Reservations</span>
                )}
              </div>

              <div className="mt-auto">
                {infoPanelOpen ? (
                  <button
                    className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-900 flex items-center gap-2"
                    onClick={onCloseInfo}
                  >
                    Close Info
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M19 12H5M5 12L12 5M5 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-900 flex items-center gap-2"
                    onClick={onViewMore}
                  >
                    View More
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
