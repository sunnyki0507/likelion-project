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

interface GetRestaurantsParams {
  tagFilters: TagFilters
  size?: number
  skip?: number
}

// Sample restaurant data
const sampleRestaurants: RestaurantInfo[] = [
  {
    id: "1",
    name: "Burger Palace",
    rating: 4.2,
    reviews: 292,
    distance: "2.4km",
    category: "American",
    isOpen: true,
    hasOnlineOrder: true,
    hasDelivery: true,
    takesReservations: true,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/restaurant1.jpg-r47O9tQO2PAR18Ip8komTkZcfPWCqJ.jpeg",
    likes: 500,
    price: 2,
    attributes: ["Hot & New", "Dogs allowed"],
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
    price: 3,
    attributes: ["Currently Happy Hour", "Available for delivery"],
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
    price: 1,
    attributes: ["Open for Reservation"],
  },
  {
    id: "4",
    name: "Pizza Express",
    rating: 4.0,
    reviews: 142,
    distance: "0.8km",
    category: "Italian",
    isOpen: true,
    hasOnlineOrder: true,
    hasDelivery: true,
    takesReservations: false,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/restaurant1.jpg-r47O9tQO2PAR18Ip8komTkZcfPWCqJ.jpeg",
    likes: 280,
    price: 2,
    attributes: ["Currently Opened", "Available for delivery"],
  },
  {
    id: "5",
    name: "Sushi Delight",
    rating: 4.7,
    reviews: 203,
    distance: "4.1km",
    category: "Japanese",
    isOpen: true,
    hasOnlineOrder: false,
    hasDelivery: false,
    takesReservations: true,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/restaurant3.jpg-V9TP6TEHG1Pmicz48F82njoFyjM57v.jpeg",
    likes: 450,
    price: 4,
    attributes: ["Waitlist Reservation", "Hot & New"],
  },
  {
    id: "6",
    name: "Mediterranean Grill",
    rating: 4.3,
    reviews: 178,
    distance: "2.9km",
    category: "Mediterranean",
    isOpen: true,
    hasOnlineOrder: true,
    hasDelivery: true,
    takesReservations: true,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/restaurant2.jpg-Zsx5wDUpmxSLjyh485HIDdG4WOXNcc.jpeg",
    likes: 380,
    price: 3,
    attributes: ["Dogs allowed", "Currently Happy Hour"],
  },
]

export async function getRestaurants({
  tagFilters,
  size = 10,
  skip = 0,
}: GetRestaurantsParams): Promise<RestaurantInfo[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Filter the sample data based on tagFilters
  let filteredRestaurants = [...sampleRestaurants]

  // Apply filters
  if (tagFilters.ratings > 0) {
    filteredRestaurants = filteredRestaurants.filter(
      (r) => r.rating >= tagFilters.ratings
    )
  }
  if (tagFilters.delivery) {
    filteredRestaurants = filteredRestaurants.filter((r) => r.hasDelivery)
  }
  if (tagFilters.price && tagFilters.price > 0) {
    filteredRestaurants = filteredRestaurants.filter((r) => r.price === tagFilters.price)
  }

  // Apply sorting
  if (tagFilters.sortBy) {
    switch (tagFilters.sortBy.toLowerCase()) {
      case "rating":
        filteredRestaurants.sort((a, b) => b.rating - a.rating)
        break
      case "reviews":
        filteredRestaurants.sort((a, b) => b.reviews - a.reviews)
        break
      // Add more sorting options as needed
    }
  }

  // Apply pagination
  return filteredRestaurants.slice(skip, skip + size)
}