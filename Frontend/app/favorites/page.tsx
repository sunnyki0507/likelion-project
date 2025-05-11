// // // // import { getRestaurants } from "../(api)/getRestaurants"
// // // // import ViewSelector from "../(components)/ViewSelector"
// // // // import type { TagFilters } from "../../types/tags"

// // // // const sampleTagFilters: TagFilters = {
// // // //   location: "irvine",
// // // //   category: "Thai",
// // // //   distance: 5,
// // // //   ratings: 4,
// // // //   delivery: true,
// // // //   vegan: false,
// // // // }

// // // // export default async function FavoritesPage() {
// // // //   const restaurants = await getRestaurants({ tagFilters: sampleTagFilters, size: 5 })

// // // //   return (
// // // //     <div className="w-full max-w-screen-xl mx-auto px-4 py-8">
// // // //       <h1 className="text-4xl font-bold mb-8">Favorites</h1>
// // // //       <ViewSelector initRestaurants={restaurants} />
// // // //     </div>
// // // //   )
// // // // }
// // // import { getRestaurants } from "../(api)/getRestaurants"
// // // import FavoriteCard from "../(components)/FavoriteCard"
// // // import type { TagFilters } from "../../types/tags"

// // // const sampleTagFilters: TagFilters = {
// // //   location: "irvine",
// // //   category: "Thai",
// // //   distance: 5,
// // //   ratings: 4,
// // //   delivery: true,
// // //   vegan: false,
// // // }

// // // export default async function FavoritesPage() {
// // //   const restaurants = await getRestaurants({ tagFilters: sampleTagFilters, size: 5 })

// // //   // Add sample data to match the design
// // //   const enhancedRestaurants = restaurants.map((restaurant) => ({
// // //     ...restaurant,
// // //     likes: 500,
// // //     reviews: 292,
// // //     distance: "2.4km",
// // //   }))

// // //   return (
// // //     <div className="w-full max-w-screen-xl mx-auto px-4 py-8">
// // //       <h1 className="text-4xl font-bold mb-8">Favorites</h1>
// // //       <div className="space-y-6">
// // //         {enhancedRestaurants.map((restaurant) => (
// // //           <FavoriteCard key={restaurant.id} restaurant={restaurant} />
// // //         ))}
// // //       </div>
// // //     </div>
// // //   )
// // // }
// // import { getRestaurants } from "../(api)/getRestaurants"
// // import ViewSelector from "../(components)/ViewSelector"
// // import type { TagFilters } from "../../types/tags"

// // const sampleTagFilters: TagFilters = {
// //   location: "irvine",
// //   category: "Thai",
// //   distance: 5,
// //   ratings: 4,
// //   delivery: true,
// //   vegan: false,
// // }

// // export default async function FavoritesPage() {
// //   const restaurants = await getRestaurants({ tagFilters: sampleTagFilters, size: 5 })

// //   // Add sample data to match the design
// //   const enhancedRestaurants = restaurants.map((restaurant) => ({
// //     ...restaurant,
// //     likes: restaurant.likes || 500,
// //     reviews: restaurant.reviews || 292,
// //     distance: restaurant.distance || "2.4km",
// //   }))

// //   return (
// //     <div className="w-full max-w-screen-xl mx-auto px-4 py-8">
// //       <ViewSelector initRestaurants={enhancedRestaurants} />
// //     </div>
// //   )
// // }


// import { getRestaurants } from "../(api)/getRestaurants"
// import ViewSelector from "../(components)/ViewSelector"
// import type { TagFilters } from "../../types/tags"

// const sampleTagFilters: TagFilters = {
//   location: "irvine",
//   category: "Thai",
//   distance: 5,
//   ratings: 4,
//   delivery: true,
//   vegan: false,
// }

// export default async function FavoritesPage() {
//   const restaurants = await getRestaurants({ tagFilters: sampleTagFilters, size: 5 })

//   // Add sample data to match the design
//   const enhancedRestaurants = restaurants.map((restaurant) => ({
//     ...restaurant,
//     likes: restaurant.likes || 500,
//     reviews: restaurant.reviews || 292,
//     distance: restaurant.distance || "2.4km",
//   }))

//   return (
//     <div className="w-full px-4 py-8">
//       <ViewSelector initRestaurants={enhancedRestaurants} />
//     </div>
//   )
// }
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
