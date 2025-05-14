// export interface TagFilters {
//   location: string
//   category: string[]
//   ratings: number
//   delivery: boolean
//   vegan: boolean
//   likes: number
//   reviews: number
//   distance: string
//   description: string
// }

// export const sampleTagFilters: TagFilters = {
// 	location: "irvine",
// 	category: ["Thai", "Japanese"],
// 	distance: "5km",
// 	ratings: 4,
// 	delivery: true,
// 	vegan: false,
// 	likes: 500,
// 	reviews: 292,
// 	description: "Description about the restaurant",
// }
export interface TagFilters {
  location: string
  category: string[] // Changed to string array
  distance: string // Changed to string to be flexible
  ratings: number
  delivery: boolean
  vegan: boolean
  likes: number
  reviews: number
  description: string
  price?: number
  sortBy?: string
  attributes?: string[]
}

export const sampleTagFilters: TagFilters = {
  location: "irvine",
  category: [],
  distance: "10",
  ratings: 0,
  delivery: false,
  vegan: false,
  likes: 0,
  reviews: 0,
  description: "",
}
