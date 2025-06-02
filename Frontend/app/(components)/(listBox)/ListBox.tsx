import Image from "next/image";
import Link from "next/link";
import { RestaurantInfo } from "@/types/restaurant";
// import { useState } from "react"; // Not needed for this basic layout
// import { HeartIcon } from "@heroicons/react/24/outline"; // Not needed for this basic layout
// import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid"; // Not needed for this basic layout

interface ListBoxProps {
  restaurantInfo: RestaurantInfo;
  onViewMore: () => void;
  // Add other props as needed, e.g., onToggleFavorite
}

export default function ListBox({
  restaurantInfo,
  onViewMore,
}: ListBoxProps) {

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex w-full items-start">
      {/* Image Section */}
      <div className="flex-shrink-0 mr-4">
        <Image
          src={restaurantInfo.image || "/placeholder-food.jpg"} // Use a placeholder if no image URL
          alt={restaurantInfo.name || "Restaurant Image"}
          width={120}
          height={120}
          className="rounded-md object-cover aspect-square"
        />
      </div>

      {/* Content Section - wrapped in a flex-col container */}
      <div className="flex-grow flex flex-col">
        {/* Top row: Name and Favorite Icon */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">
              {restaurantInfo.name}
            </h3>
            {/* Rating and Distance */}
            <div className="flex items-center text-sm text-gray-600">
              {/* Add Star Rating Component Here */}
              <span>{restaurantInfo.rating?.toFixed(1) || "N/A"}</span>
              <span className="mx-1">•</span>
              <span>({restaurantInfo.reviews || 0})</span>
              <span className="mx-1">•</span>
              <span>{restaurantInfo.distance || "N/A"}km</span>
            </div>
            {/* Category */}
            <div className="text-sm text-blue-600">
              {restaurantInfo.category || "N/A"}
            </div>
            {/* Status (Open/Closed) and Order Online */}
            <div className="text-sm text-gray-800 mt-1">
              <div>{restaurantInfo.isOpen ? "Open" : "Closed"}</div>
              {restaurantInfo.hasOnlineOrder && (
                <span className="text-green-600">
                  Order Online Available
                </span>
              )}
            </div>
          </div>
          {/* Favorite Icon - Placeholder based on initial image*/}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-400 cursor-pointer">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>

        {/* Tags (Offers Delivery, Takes Reservations) */}
        <div className="flex mt-2 space-x-2">
          {restaurantInfo.hasDelivery && (
            <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Offers Delivery
            </span>
          )}
          {restaurantInfo.takesReservations && (
            <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Takes Reservations
            </span>
          )}
        </div>

        {/* View More Button - Aligned to the right */}
        <div className="mt-auto flex justify-end">
          <button onClick={onViewMore} className="text-blue-600 hover:underline text-sm flex items-center">
            VIEW MORE
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
