export interface RestaurantInfo {
    id: string;
    name: string;
    rating: number;
    reviews: number;
    distance: string;
    category: string;
    isOpen: boolean;
    hasOnlineOrder: boolean;
    hasDelivery: boolean;
    takesReservations: boolean;
    image: string;
    likes?: number;
}