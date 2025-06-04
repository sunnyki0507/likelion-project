"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Heart, ArrowRight } from "lucide-react"
import type { RestaurantInfo } from "@/types/restaurant"
import ListBoxInfoPanel from "./ListBoxInfoPanel"

interface ListBoxProps {
  restaurantInfo: RestaurantInfo
  onToggleFavorite?: (id: string, isFavorited: boolean) => void
  initialFavorited?: boolean
}

export default function ListBox({ restaurantInfo, onToggleFavorite, initialFavorited = false }: ListBoxProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited)
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newFavoritedState = !isFavorited
    setIsFavorited(newFavoritedState)

    if (onToggleFavorite) {
      onToggleFavorite(restaurantInfo.id, newFavoritedState)
    }
  }

  const handleViewMore = () => {
    setIsInfoPanelOpen(true)
  }

  const handleCloseInfoPanel = () => {
    setIsInfoPanelOpen(false)
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full max-w-4xl">
        <div className="flex flex-col md:flex-row">
          {/* Restaurant Image Section with Heart */}
          <div className="relative h-48 md:h-auto md:w-64 flex-shrink-0">
            <Image
              src={restaurantInfo.image || "/placeholder.svg?height=200&width=200&query=restaurant food"}
              alt={restaurantInfo.name}
              fill
              className="object-cover"
              priority
            />

            {/* Heart Button */}
            <button
              onClick={handleFavoriteClick}
              className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={`w-5 h-5 transition-colors ${isFavorited ? "text-red-500 fill-red-500" : "text-gray-400"}`}
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

              {/* View More Button */}
              <div className="mt-auto">
                <button
                  onClick={handleViewMore}
                  className="inline-flex items-center px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium text-sm group"
                >
                  VIEW MORE
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Panel Modal */}
      <ListBoxInfoPanel restaurant={restaurantInfo} isOpen={isInfoPanelOpen} onClose={handleCloseInfoPanel} />
    </>
  )
}
