// "use client"

// import { useState } from "react"
// import type { ViewType } from "@/types/view"
// import FavoriteCard from "./(favoriteCard)/FavoriteCard"
// import ViewToggle from "./ViewToggle"
// import { RestaurantInfo } from "@/types/restaurant"

// export default function ViewSelector({ initRestaurants }: { initRestaurants: RestaurantInfo[] }) {
//   const [currentView, setCurrentView] = useState<ViewType>("Card")
//   const [restaurants] = useState<RestaurantInfo[]>(initRestaurants)

//   const handleViewChange = (view: ViewType) => {
//     setCurrentView(view)
//   }

//   return (
//     <div className="w-full">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-4xl font-bold">Favorites</h1>
//         <ViewToggle currentView={currentView} onViewChange={handleViewChange} />
//       </div>

//       <div className="space-y-6 w-full">
//         {currentView === "Card" ? (
//           restaurants.map((restaurant) => <FavoriteCard key={restaurant.id} restaurant={restaurant} />)
//         ) : (
//           <div className="bg-white rounded-lg shadow-md p-4">
//             <p className="text-gray-500">List view coming soon...</p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
"use client"

import { useState } from "react"
import type { ViewType } from "@/types/view"
import FavoriteCard from "./(favoriteCard)/FavoriteCard"
import ViewToggle from "./ViewToggle"
import type { RestaurantInfo } from "@/types/restaurant"
import ListBox from "./(listBox)/ListBox"

export default function ViewSelector({ initRestaurants }: { initRestaurants: RestaurantInfo[] }) {
  const [currentView, setCurrentView] = useState<ViewType>("Card")
  const [restaurants] = useState<RestaurantInfo[]>(initRestaurants)

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view)
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Favorites</h1>
        <ViewToggle currentView={currentView} onViewChange={handleViewChange} />
      </div>

      <div className="space-y-6 w-full">
        {currentView === "Card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <FavoriteCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {restaurants.map((restaurant) => (
              <ListBox
                key={restaurant.id}
                restaurantInfo={restaurant}
                onViewMore={() => {
                  // Handle view more action
                  console.log("View more for:", restaurant.name)
                }}
                onToggleFavorite={() => {
                  // Handle favorite toggle
                  console.log("Toggle favorite for:", restaurant.name)
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
