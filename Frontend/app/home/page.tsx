// import { getRestaurants } from "../(api)/getRestaurants"
// import CardBoxHolder from "../(components)/CardBoxHolder"
// import type { TagFilters } from "../../types/tags"

// const sampleTagFilters: TagFilters = {
//   location: "irvine",
//   category: "Thai",
//   distance: 5,
//   ratings: 4,
//   delivery: true,
//   vegan: false,
// }

// export default async function HomePage() {
//   const restaurants = await getRestaurants({ tagFilters: sampleTagFilters, size: 5 })

//   // Add sample data to match the design
//   const enhancedRestaurants = restaurants.map((restaurant) => ({
//     ...restaurant,
//     likes: restaurant.likes || 500,
//     reviews: restaurant.reviews || 292,
//     distance: restaurant.distance || "2.4km",
//     description: "Description about the restaurant",
//   }))

//   return (
//     <div className="w-full h-[calc(100vh-132px)]">
//       <CardBoxHolder initRestaurants={enhancedRestaurants} />
//     </div>
//   )
// }
"use client"

import { useState } from "react"
import CardBoxHolder from "../(components)/CardBoxHolder"
import FilterModal from "../(components)/FilterModal"
import { getRestaurantsFromFilters } from "../(api)/getRestaurants"
import type { FilterState } from "../(components)/FilterModal"

function resolveZipFromLocation(location: string): string {
  const mapping: Record<string, string> = {
    "Irvine Spectrum Center": "92618",
    "Newport Beach": "92660",
    "Costa Mesa": "92627",
    "Laguna Beach": "92651",
    "Anaheim": "92801",
  }
  return mapping[location] || "92612"
}

export default function HomePage() {
  const [restaurants, setRestaurants] = useState<any[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("Irvine Spectrum Center")

  const handleApply = async (filters: FilterState) => {
    const zip = resolveZipFromLocation(selectedLocation)
    const data = await getRestaurantsFromFilters(filters, zip)
    setRestaurants(data)
  }

  return (
    <div className="w-full h-[calc(100vh-132px)] relative">
      <button
        onClick={() => setIsFilterOpen(true)}
        className="absolute top-4 right-4 z-10 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800"
      >
        필터 열기
      </button>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApply}
      />

      <CardBoxHolder initRestaurants={restaurants} />
    </div>
  )
}

