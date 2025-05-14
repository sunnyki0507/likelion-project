import Image from "next/image"
import Link from "next/link"
import { HeartIcon } from "@heroicons/react/24/solid"
import type { RestaurantInfo } from "../(api)/getRestaurants"

export default function RestaurantListView({ restaurant }: { restaurant: RestaurantInfo }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 flex flex-col md:flex-row">
      <div className="p-6 flex-1">
        {/* Likes count */}
        <div className="flex items-center mb-3">
          <HeartIcon className="w-5 h-5 text-[#e10a0a] mr-2" />
          <span className="font-medium">{restaurant.likes}</span>
        </div>

        {/* Restaurant name */}
        <h2 className="text-2xl font-bold mb-2">{restaurant.name}</h2>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <span className="text-lg font-medium mr-2">{restaurant.rating}</span>
          <div className="flex items-center">
            <span className="text-yellow-400">{"★".repeat(Math.floor(restaurant.rating))}</span>
            <span className="text-gray-200">{"★".repeat(5 - Math.floor(restaurant.rating))}</span>
          </div>
          <span className="text-gray-500 ml-2">({restaurant.reviews})</span>
        </div>

        {/* Category and distance */}
        <div className="flex items-center text-gray-500 mb-4">
          <span className="text-blue-500 hover:underline">{restaurant.category}</span>
          <span className="mx-2">•</span>
          <span>{restaurant.distance}</span>
        </div>

        {/* Status tags */}
        <div className="mb-4">
          <span className="text-green-500 font-medium mr-2">Open</span>
          <span className="text-gray-500">• Order Online</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {restaurant.hasDelivery && (
            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm">Offers Delivery</span>
          )}
          {restaurant.takesReservations && (
            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm">Takes Reservations</span>
          )}
        </div>

        {/* View More button */}
        <Link
          href={`/restaurant/${restaurant.id}`}
          className="inline-block px-6 py-3 bg-black text-white rounded-full text-center hover:bg-gray-800 transition-colors"
        >
          View More...
        </Link>
      </div>

      {/* Restaurant Image */}
      <div className="relative h-64 md:h-auto md:w-1/2 lg:w-2/5">
        <Image
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
        />
        <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md">
          <HeartIcon className="w-6 h-6 text-[#e10a0a] fill-current" />
        </button>
      </div>
    </div>
  )
}
