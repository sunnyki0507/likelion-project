import Image from "next/image"
import Link from "next/link"
import { HeartIcon } from "@heroicons/react/24/outline"
import { RestaurantInfo } from "@/types/restaurant"

export default function RestaurantCard({ restaurant }: { restaurant: RestaurantInfo }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
      {/* Restaurant Image */}
      <div className="relative h-48 w-full">
        <Image
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
        />
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md">
          <HeartIcon className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Restaurant Info */}
      <div className="p-5 flex-grow flex flex-col">
        <h2 className="text-xl font-bold mb-2">{restaurant.name}</h2>

        <div className="flex items-center mb-2">
          <span className="text-lg font-medium mr-2">{restaurant.rating}</span>
          <div className="flex items-center">
            <span className="text-yellow-400">{"★".repeat(Math.floor(restaurant.rating))}</span>
            <span className="text-gray-200">{"★".repeat(5 - Math.floor(restaurant.rating))}</span>
          </div>
          <span className="text-gray-500 ml-2">({restaurant.reviews})</span>
        </div>

        <div className="flex items-center text-gray-500 mb-3">
          <span>{restaurant.category}</span>
          <span className="mx-2">•</span>
          <span>{restaurant.distance}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
            {restaurant.isOpen ? "Open Now" : "Closed"}
          </span>
          {restaurant.hasDelivery && <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">Delivery</span>}
          {restaurant.takesReservations && (
            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">Reservations</span>
          )}
        </div>

        <Link
          href={`/restaurant/${restaurant.id}`}
          className="mt-auto px-4 py-2 bg-black text-white rounded-full text-center hover:bg-gray-800 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
