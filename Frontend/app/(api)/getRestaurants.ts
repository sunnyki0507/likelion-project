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
}

interface GetRestaurantsParams {
  tagFilters: TagFilters
  size?: number
  skip?: number
}

// Sample restaurant data
const sampleRestaurants: RestaurantInfo[] = [
  {
    id: "1",
    name: "Business 1",
    rating: 4,
    reviews: 292,
    distance: "2.4km",
    category: "Category",
    isOpen: true,
    hasOnlineOrder: true,
    hasDelivery: true,
    takesReservations: true,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/restaurant1.jpg-r47O9tQO2PAR18Ip8komTkZcfPWCqJ.jpeg",
    likes: 500,
  },
  {
    id: "2",
    name: "Thai Spice",
    rating: 4.5,
    reviews: 156,
    distance: "1.8km",
    category: "Thai",
    isOpen: true,
    hasOnlineOrder: true,
    hasDelivery: true,
    takesReservations: false,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/restaurant3.jpg-V9TP6TEHG1Pmicz48F82njoFyjM57v.jpeg",
    likes: 320,
  },
  {
    id: "3",
    name: "Noodle House",
    rating: 3.8,
    reviews: 87,
    distance: "3.2km",
    category: "Asian Fusion",
    isOpen: false,
    hasOnlineOrder: false,
    hasDelivery: true,
    takesReservations: true,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/restaurant2.jpg-Zsx5wDUpmxSLjyh485HIDdG4WOXNcc.jpeg",
    likes: 210,
  },
]

export async function getRestaurants({
  tagFilters,
  size = 10,
  skip = 0,
}: GetRestaurantsParams): Promise<RestaurantInfo[]> {
  // In a real app, this would be an API call with the filters applied
  // For now, we'll just return our sample data

  // Simulate a delay to mimic a real API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return sampleRestaurants.slice(skip, skip + size)
}
