// "use client"

// import { useEffect, useState } from "react"
// import ListBox from "./ListBox"
// import type { RestaurantInfo } from "@/types/restaurant"
// import { getRestaurants } from "@/app/(api)/getRestaurants"
// import type { TagFilters } from "@/types/tags"

// interface ListBoxHolderProps {
//   tagFilters: TagFilters
// }

// export default function ListBoxHolder({ tagFilters }: ListBoxHolderProps) {
//   const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([])
//   const [isLoading, setIsLoading] = useState(true)

//   // Fetch restaurants based on tagFilters
//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       setIsLoading(true)
//       const fetchedRestaurants = await getRestaurants({ tagFilters: tagFilters, size: 10, skip: 0 })
//       setRestaurants(fetchedRestaurants)
//       setIsLoading(false)
//     }
//     fetchRestaurants()
//   }, [tagFilters])

//   return (
//     <div className="w-full flex justify-center">
//       <div className="w-full max-w-4xl px-4 py-6">
//         <div className="space-y-4">
//           {isLoading ? (
//             <div className="text-center py-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
//               <p className="mt-4 text-gray-600">Loading restaurants...</p>
//             </div>
//           ) : (
//             restaurants.map((restaurant) => (
//               <div key={restaurant.id} className="flex justify-center">
//                 <ListBox
//                   restaurantInfo={restaurant}
//                   onViewMore={() => {
//                     console.log("View more for:", restaurant.name)
//                     // Handle navigation to restaurant detail page
//                   }}
//                   onToggleFavorite={() => {
//                     console.log("Toggle favorite for:", restaurant.name)
//                     // Handle favorite toggle
//                   }}
//                 />
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import ListBox from "./ListBox"
import type { RestaurantInfo } from "@/types/restaurant"
import { getRestaurants } from "@/app/(api)/getRestaurants"
import type { TagFilters } from "@/types/tags"

interface ListBoxHolderProps {
  tagFilters: TagFilters
}

export default function ListBoxHolder({ tagFilters }: ListBoxHolderProps) {
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites)
        setFavorites(new Set(parsedFavorites))
      } catch (e) {
        console.error("Error parsing favorites from localStorage:", e)
      }
    }
  }, [])

  // Fetch restaurants based on tagFilters
  useEffect(() => {
    const fetchRestaurants = async () => {
      setIsLoading(true)
      const fetchedRestaurants = await getRestaurants({ tagFilters: tagFilters, size: 10, skip: 0 })
      setRestaurants(fetchedRestaurants)
      setIsLoading(false)
    }
    fetchRestaurants()
  }, [tagFilters])

  // Handle favorite toggling
  const handleToggleFavorite = (id: string, isFavorited: boolean) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites)

      if (isFavorited) {
        newFavorites.add(id)
      } else {
        newFavorites.delete(id)
      }

      // Save to localStorage
      localStorage.setItem("favorites", JSON.stringify([...newFavorites]))

      return newFavorites
    })
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl px-4 py-6">
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading restaurants...</p>
            </div>
          ) : (
            restaurants.map((restaurant) => (
              <div key={restaurant.id} className="flex justify-center">
                <ListBox
                  restaurantInfo={restaurant}
                  initialFavorited={favorites.has(restaurant.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onViewMore={() => {
                    console.log("View more for:", restaurant.name)
                    // Handle navigation to restaurant detail page
                  }}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
