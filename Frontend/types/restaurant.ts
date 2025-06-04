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
    description?: string
  }


export type RestaurantDetail = {
	popularMenus: MenuItem[]
	foodImageUrls: string[]
	reviews: Review[]
}

type MenuItem = {
	name: string
  thumbnail: string
	desc: string
	price: string
}

type Review = {
	authorName: string
	rating: number // 0~5
	content: string
}
