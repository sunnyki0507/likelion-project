import React from "react"
import type { RestaurantInfo } from "@/types/restaurant"
import CardBoxInfoPanel from "../(cardBox)/CardBoxInfoPanel"

interface FavoriteCardInfoPanelProps {
  restaurant: RestaurantInfo
  onClose: () => void
}

export default function FavoriteCardInfoPanel({ restaurant, onClose }: FavoriteCardInfoPanelProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">

      <div className="relative bg-white rounded-2xl shadow-xl w-[950px] max-h-[90vh] flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-xl font-bold z-10"
          aria-label="Close"
        >
          ×
        </button>
        {/* Info Panel Content */}
        <div className=" w-[600px] flex self-center">
          <CardBoxInfoPanel
            restaurant={restaurant}
            className="h-[80vh]"
            onWheel={e => e.stopPropagation()}
          /></div>
      </div>
    </div>
  )
} 