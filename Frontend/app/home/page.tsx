// import { getRestaurants } from "../(api)/getRestaurants";
// import ViewSelector from "../(components)/ViewSelector";

// const sampleTag: Tags = {
//     location: "irvine",
//     category: "Thai",
//     distance: 5,
//     ratings: 4,
//     delivery: true,
//     vegan: false,
// }

// export default async function HomePage() {
//     const restaurants = await getRestaurants({ tags: sampleTag, size: 5 });

//     return (
//         <>
//             <ViewSelector initRestaurants={restaurants}/>
//         </>
//     );
// }
import { getRestaurants } from "../(api)/getRestaurants"
import CardBoxHolder from "../(components)/CardBoxHolder"
import type { TagFilters } from "../../types/tags"

const sampleTagFilters: TagFilters = {
  location: "irvine",
  category: "Thai",
  distance: 5,
  ratings: 4,
  delivery: true,
  vegan: false,
}

export default async function HomePage() {
  const restaurants = await getRestaurants({ tagFilters: sampleTagFilters, size: 5 })

  // Add sample data to match the design
  const enhancedRestaurants = restaurants.map((restaurant) => ({
    ...restaurant,
    likes: restaurant.likes || 500,
    reviews: restaurant.reviews || 292,
    distance: restaurant.distance || "2.4km",
    description: "Description about the restaurant",
  }))

  return (
    <div className="w-full h-[calc(100vh-132px)]">
      <CardBoxHolder initRestaurants={enhancedRestaurants} />
    </div>
  )
}
