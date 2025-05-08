import { getRestaurants } from "../(api)/getRestaurants"
import ViewSelector from "../(components)/ViewSelector"
import type { Tags } from "@/types/tags"

const sampleTag: Tags = {
  location: "irvine",
  category: "Thai",
  distance: 5,
  ratings: 4,
  delivery: true,
  vegan: false,
}

export default async function FavoritesPage() {
  const restaurants = await getRestaurants({ tags: sampleTag, size: 5 })

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Favorites</h1>
      <ViewSelector initRestaurants={restaurants} />
    </div>
  )
}
