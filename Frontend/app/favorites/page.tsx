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
