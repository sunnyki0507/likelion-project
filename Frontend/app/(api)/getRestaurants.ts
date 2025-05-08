"use server"


// export async function getRestaurants({ tags, size = 10, skip = 0 }: { tags: Tags, size?:number, skip?: number }) {

//     return restaurants.slice(skip, skip+size);
// }

export async function getRestaurants({ tags, size = 10, skip = 0 }: { tags: Tags; size?: number; skip?: number }) {
    // In a real implementation, you would filter by tags
    // For now, we'll just return the mock data
    return restaurants.slice(skip, skip + size)
}


const restaurants: RestaurantInfo[] = [
    {
        id: "1",
        name: "Business 1",
        rating: 4.0,
        reviews: 292,
        distance: "2.4km",
        category: "Category",
        isOpen: true,
        hasOnlineOrder: true,
        hasDelivery: true,
        takesReservations: true,
        image: "/images/restaurant1.jpg",
        likes: 500
    },
    {
        id: "2",
        name: "Business 2",
        rating: 4.0,
        reviews: 292,
        distance: "2.4km",
        category: "Category",
        isOpen: true,
        hasOnlineOrder: true,
        hasDelivery: true,
        takesReservations: true,
        image: "/images/restaurant1.jpg",
        likes: 500
    },
    {
        id: "3",
        name: "Business 3",
        rating: 4.0,
        reviews: 292,
        distance: "2.4km",
        category: "Category",
        isOpen: true,
        hasOnlineOrder: true,
        hasDelivery: true,
        takesReservations: true,
        image: "/images/restaurant1.jpg",
        likes: 500
    },
    {
        id: "4",
        name: "Business 4",
        rating: 4.0,
        reviews: 292,
        distance: "2.4km",
        category: "Category",
        isOpen: true,
        hasOnlineOrder: true,
        hasDelivery: true,
        takesReservations: true,
        image: "/images/restaurant1.jpg",
        likes: 500
    },
    {
        id: "5",
        name: "Business 5",
        rating: 4.0,
        reviews: 292,
        distance: "2.4km",
        category: "Category",
        isOpen: true,
        hasOnlineOrder: true,
        hasDelivery: true,
        takesReservations: true,
        image: "/images/restaurant1.jpg",
        likes: 500
    },
    {
        id: "6",
        name: "Business 6",
        rating: 4.0,
        reviews: 292,
        distance: "2.4km",
        category: "Category",
        isOpen: true,
        hasOnlineOrder: true,
        hasDelivery: true,
        takesReservations: true,
        image: "/images/restaurant1.jpg",
        likes: 500
    },
    {
        id: "7",
        name: "Business 7",
        rating: 4.0,
        reviews: 292,
        distance: "2.4km",
        category: "Category",
        isOpen: true,
        hasOnlineOrder: true,
        hasDelivery: true,
        takesReservations: true,
        image: "/images/restaurant1.jpg",
        likes: 500
    },
    {
        id: "8",
        name: "Business 8",
        rating: 4.0,
        reviews: 292,
        distance: "2.4km",
        category: "Category",
        isOpen: true,
        hasOnlineOrder: true,
        hasDelivery: true,
        takesReservations: true,
        image: "/images/restaurant1.jpg",
        likes: 500
    },
    {
        id: "9",
        name: "Business 9",
        rating: 4.0,
        reviews: 292,
        distance: "2.4km",
        category: "Category",
        isOpen: true,
        hasOnlineOrder: true,
        hasDelivery: true,
        takesReservations: true,
        image: "/images/restaurant1.jpg",
        likes: 500
    },
    {
        id: "10",
        name: "Business 10",
        rating: 4.0,
        reviews: 292,
        distance: "2.4km",
        category: "Category",
        isOpen: true,
        hasOnlineOrder: true,
        hasDelivery: true,
        takesReservations: true,
        image: "/images/restaurant1.jpg",
        likes: 500
    },
    {
        id: "11",
        name: "Business 11",
        rating: 4.0,
        reviews: 292,
        distance: "2.4km",
        category: "Category",
        isOpen: true,
        hasOnlineOrder: true,
        hasDelivery: true,
        takesReservations: true,
        image: "/images/restaurant1.jpg",
        likes: 500
    },
    {
        id: "12",
        name: "Business 12",
        rating: 4.0,
        reviews: 292,
        distance: "2.4km",
        category: "Category",
        isOpen: true,
        hasOnlineOrder: true,
        hasDelivery: true,
        takesReservations: true,
        image: "/images/restaurant1.jpg",
        likes: 500
    },
    {
        id: "13",
        name: "Business 13",
        rating: 4.0,
        reviews: 292,
        distance: "2.4km",
        category: "Category",
        isOpen: true,
        hasOnlineOrder: true,
        hasDelivery: true,
        takesReservations: true,
        image: "/images/restaurant1.jpg",
        likes: 500
    },
];