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

export async function getRestaurants({
  location,
  category,
  distance,
  ratings,
  //delivery,
  //vegan,
  likes,
  reviews,
  description,
  price,
  sortBy,
  attributes,
  size = 10,
  skip = 0,
}: GetRestaurantsParams): Promise<RestaurantInfo[]> {
  const params = new URLSearchParams({
    location: location || "92612",
    limit: size.toString(),
    //distance,
    //ratings: ratings.toString(),
    //delivery: delivery.toString(),
    //categories: category.join(','),
    //attributes: attributes?.join(',') ?? '',
    //price: price?.toString() ?? '',
    //sort_by: 'best_match',
    // size: size.toString(),
    // skip: skip.toString(),
  })

  const url = `http://localhost:3000/search?${params.toString()}`
  console.log("Sending request to:", url)

  const res = await fetch(url)

  if (!res.ok) {
    console.error("API 요청 실패:", res.status, res.statusText)
    throw new Error("API 요청 실패")
  }

  const data = await res.json()
  console.log("받은 데이터:", data)

  return data
}




