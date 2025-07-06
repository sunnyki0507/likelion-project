import { getRestaurants } from "../(api)/getRestaurants"
import CustomizePage from "../(components)/CustomizePage"

export default async function CustomizePageRoute() {
  // Fetch initial restaurants with default filters
  const initialRestaurants = await getRestaurants({
    tagFilters: {
      location: "92612",
      category: [],
      distance: "20",
      ratings: 2,
      //delivery: false,
      //vegan: false,
      likes: 0,
      reviews: 0,
      description: "",
      price: 2,
      sortBy: "best_match",
      attributes: ["open_to_all"],
    },
    size: 3,
  })

  return <CustomizePage initialRestaurants={initialRestaurants} />
}

