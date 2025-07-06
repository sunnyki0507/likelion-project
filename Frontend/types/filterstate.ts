export interface FilterState {
  categories: string[]    // Note: "categories" vs "category"
  distance: number       // Note: number vs string
  rating: number        // Note: "rating" vs "ratings"
  price: number         // Extra field
  delivery: boolean
  vegan: boolean
  sortBy: string        // Extra field
  attributes: string[]  // Extra field
  location: string
  likes: number
  reviews: number
  description: string
}
