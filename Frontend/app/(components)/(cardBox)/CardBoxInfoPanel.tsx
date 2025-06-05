import React from "react"
import type { RestaurantInfo, RestaurantDetail } from "@/types/restaurant"

interface CardBoxInfoPanelProps {
  restaurant: RestaurantInfo
  className?: string
  onWheel?: React.WheelEventHandler<HTMLDivElement>
}

export default function CardBoxInfoPanel({ restaurant, className = '', onWheel }: CardBoxInfoPanelProps) {
  const [detail, setDetail] = React.useState<RestaurantDetail | null>(null)

  React.useEffect(() => {
    console.log('Fetching details for restaurant:', restaurant.id);
    fetch(`/api/restaurants/${restaurant.id}`)
      .then(res => {
        console.log('API response status:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('Received data:', data);
        setDetail(data);
      })
      .catch(err => {
        console.error('Error fetching restaurant details:', err);
      });
  }, [restaurant.id])

  if (!detail) {
    return <div className={`h-full w-full p-6 ${className}`}>Loading...</div>
  }

  return (
    <div className={`h-full w-full p-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${className}`} onWheel={onWheel}>
      {/* Popular Menu */}
      <div className="mb-6">
        <div className="font-semibold text-base mb-3 flex items-center gap-2">
          <span role="img" aria-label="menu">🍽️</span> Popular Menu
        </div>
        <div className="grid grid-cols-3 gap-2">
          {detail.popularMenus?.map((menu, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <img src={menu.thumbnail} alt={menu.name} className="w-16 h-16 rounded-xl object-cover mb-1" />
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
          {detail.foodImageUrls?.map((img, idx) => (
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
          {detail.reviews?.map((review, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-2">
              <div className="flex items-center mb-1">
                <span className="text-yellow-400 mr-2">{"★".repeat(review.rating)}</span>
              </div>
              <div className="text-gray-700 text-xs mb-1">"{review.content}"</div>
              <div className="font-bold text-gray-900 text-xs">{review.authorName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
