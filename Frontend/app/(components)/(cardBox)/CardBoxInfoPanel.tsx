import React from "react"
import type { RestaurantInfo } from "@/types/restaurant"

interface CardBoxInfoPanelProps {
  restaurant: RestaurantInfo
  className?: string
  onWheel?: React.WheelEventHandler<HTMLDivElement>
}

export default function CardBoxInfoPanel({ restaurant, className = '', onWheel }: CardBoxInfoPanelProps) {
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

  return (
    <div className={`h-full w-full p-6 overflow-y-auto ${className}`} onWheel={onWheel}>
      {/* Popular Menu */}
      <div className="mb-6">
        <div className="font-semibold text-base mb-3 flex items-center gap-2">
          <span role="img" aria-label="menu">🍽️</span> Popular Menu
        </div>
        <div className="grid grid-cols-3 gap-2">
          {menus.map((menu, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <img src={menu.img} alt={menu.name} className="w-16 h-16 rounded-xl object-cover mb-1" />
              <div className="text-xs text-gray-700">{menu.name}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Images */}
      <div className="mb-6">
        <div className="font-semibold text-base mb-3 flex items-center gap-2">
          <span role="img" aria-label="images">🖼️</span> Images
        </div>
        <div className="grid grid-cols-3 gap-2">
          {images.map((img, idx) => (
            <img key={idx} src={img} alt="food" className="w-16 h-16 rounded-xl object-cover" />
          ))}
        </div>
      </div>
      {/* Reviews */}
      <div className="mb-6">
        <div className="font-semibold text-base mb-3 flex items-center gap-2">
          <span role="img" aria-label="reviews">⭐</span> Reviews
        </div>
        <div className="space-y-3">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-2">
              <div className="flex items-center mb-1">
                <span className="text-yellow-400 mr-2">{"★".repeat(review.rating)}</span>
              </div>
              <div className="text-gray-700 text-xs mb-1">"{review.text}"</div>
              <div className="font-bold text-gray-900 text-xs">{review.user}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
