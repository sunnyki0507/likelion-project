import type { TagFilters } from "@/types/tags"
export interface RestaurantInfo {
  id: string
  name: string
  rating: number
  reviews: number
  distance: string
  category: string
  isOpen: boolean
  hasOnlineOrder: boolean
  hasDelivery: boolean
  takesReservations: boolean
  image: string
  likes?: number
  price?: number
  attributes?: string[]
  description?: string
}

interface GetRestaurantsParams extends TagFilters {
  size?: number
  skip?: number
}

function mapSortKey(key: string): string {
  switch (key?.toLowerCase()) {
    case 'ratings':
      return 'rating'
    case 'number of reviews':
      return 'review_count'
    case 'distance':
      return 'distance'
    case 'best':
    default:
      return 'best_match'
  }
}

export async function getRestaurants({
  location,
  category = [],
  distance,
  ratings,
  //delivery,
  //vegan,
  // likes,
  // reviews,
  // description,
  price,
  sortBy,
  attributes,
  size = 10,
  skip = 0,
}: GetRestaurantsParams): Promise<RestaurantInfo[]> {
  const params = new URLSearchParams({
    location: location ?? "92612",
    limit: size.toString(),
    radius: distance?.toString() ?? "5",
    ratings: ratings?.toString() ?? "0",
    categories: category.length > 0 ? category.join(',') : 'asian',
    attributes: Array.isArray(attributes) && attributes.length > 0 ? attributes.join(',') : 'open_to_all',
    price: price?.toString() ?? '2',
    sort_by: mapSortKey(sortBy ?? 'Best'),
    offset: skip.toString(),
  })

  const url = `http://localhost:3000/search?${params.toString()}`
  console.log("Sending request to:", url)

  try {
    const res = await fetch(url)
    if (!res.ok) {
      console.error("API request failed:", res.status, res.statusText)
      throw new Error(`API request failed: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    console.log("Received data:", data)
    return data
  } catch (error) {
    console.error("Error fetching restaurants:", error)
    throw error
  }
}




