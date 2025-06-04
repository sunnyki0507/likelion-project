"use client"

import { RestaurantInfo } from "@/types/restaurant"
import { HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import CardBoxInfoPanel from "./CardBoxInfoPanel"
import { saveFavoriteRestaurant, deleteFavoriteRestaurant, getFavoriteRestaurants } from "../(favoriteCard)/SaveFavorite"

interface CardBoxProps {
  restaurantInfo: RestaurantInfo
  onViewMore: () => void
  infoPanelOpen: boolean
  onCloseInfo: () => void
}

export default function CardBox({ restaurantInfo, onViewMore, infoPanelOpen, onCloseInfo }: CardBoxProps) {
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
    <div className="w-[1000px] h-[500px] mx-auto bg-white rounded-3xl shadow-lg mb-6 overflow-hidden">
      <div className="flex flex-row">
        {/* Left Content */}
        <div className="flex-1 p-8 space-y-6 relative max-w-[500px]">
          {/* Likes Counter */}

          <h2 className="text-4xl font-bold pt-10 break-words">{restaurant.name}</h2>


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
            <span className="text-green-500 font-medium py-2">{restaurant.isOpen ? "Open" : "Closed"}</span>
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

          {/* View More/Close Info Button - Now positioned at bottom right of left div */}
          <div className="absolute bottom-14 right-8">
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

        {/* Right Side: Image or Info Box */}
        <div className="relative w-[500px] aspect-square bg-gray-50">
          {infoPanelOpen ? (
            <CardBoxInfoPanel
              restaurant={restaurant}
              onWheel={e => e.stopPropagation()}
              className="absolute inset-0"
            />
          ) : (
            <Image
              src={restaurant.image || "/placeholder.svg?height=500&width=500&query=restaurant"}
              alt={restaurant.name}
              fill
              className="object-cover"
              priority
            />
          )}
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
