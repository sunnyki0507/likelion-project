export interface TagFilters {
  location: string
  category: string[]
  ratings: number
  delivery: boolean
  vegan: boolean
  likes: number
  reviews: number
  distance: string
  description: string
}

export const sampleTagFilters: TagFilters = {
	location: "irvine",
	category: ["Thai", "Japanese"],
	distance: "5km",
	ratings: 4,
	delivery: true,
	vegan: false,
	likes: 500,
	reviews: 292,
	description: "Description about the restaurant",
}