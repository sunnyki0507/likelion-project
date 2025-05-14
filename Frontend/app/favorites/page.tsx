import { getRestaurants } from "../(api)/getRestaurants"
import RestaurantCard from "../(components)/RestaurantCard"
import type { TagFilters } from "../../types/tags"

const sampleTagFilters: TagFilters = {
  location: "irvine",
  category: "",
  distance: 10,
  ratings: 0,
  delivery: false,
  vegan: false,
}

export default async function HomePage() {
  const restaurants = await getRestaurants({ tagFilters: sampleTagFilters, size: 10 })

  return (
    <div className="w-full px-4 py-8 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Favorites</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  )
}
// "use client"

// import { useState, useEffect } from "react"
// import { getRestaurants } from "../(api)/getRestaurants"
// import CardBoxHolder from "../(components)/CardBoxHolder"
// import RestaurantListView from "../(components)/RestaurantListView"
// import { useView } from "../(context)/ViewContext"
// import type { RestaurantInfo } from "../(api)/getRestaurants"
// import type { TagFilters } from "@/types/tags"

// export default function FavoritesPage() {
//   const { viewMode } = useView()
//   const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     async function loadRestaurants() {
//       setLoading(true)
//       try {
//         const tagFilters: TagFilters = {
//           location: "irvine",
//           category: "",
//           distance: 10,
//           ratings: 0,
//           delivery: false,
//           vegan: false,
//         }

//         const data = await getRestaurants({ tagFilters })
//         setRestaurants(data)
//       } catch (error) {
//         console.error("Failed to load restaurants:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadRestaurants()
//   }, [])

//   return (
//     <div className="w-full px-4 py-8 max-w-screen-xl mx-auto">
//       <h1 className="text-4xl font-bold mb-6">Favorites</h1>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <p className="text-lg">Loading your favorite restaurants...</p>
//         </div>
//       ) : (
//         <>
//           {viewMode === "card" ? (
//             <div className="w-full h-[calc(100vh-200px)]">
//               <CardBoxHolder initRestaurants={restaurants} />
//             </div>
//           ) : (
//             <div>
//               {restaurants.map((restaurant) => (
//                 <RestaurantListView key={restaurant.id} restaurant={restaurant} />
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   )
// }
