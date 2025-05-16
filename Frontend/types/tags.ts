export interface TagFilters {
  location: string
  category: string[] // Changed to string array
  distance: string // Changed to string to be flexible
  ratings: number
  //delivery: boolean
  //vegan: boolean
  likes: number
  reviews: number
  description: string
  price?: number
  sortBy?: string
  attributes?: string[]
}

export const sampleTagFilters: TagFilters = {
  location: "92612",
  category: [],
  distance: "10",
  ratings: 0,
  //delivery: false,
  //vegan: false,
  likes: 0,
  reviews: 0,
  description: "",
}
