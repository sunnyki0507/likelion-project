"use client"

import CardBox from "../(components)/CardBox";
import { useState } from "react";
import CardBoxHolder from "../(components)/CardBoxHolder";


const restaurants: RestaurantInfo[] = [
    {
        id: "1",
        name: "Business Name",
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
        name: "Business Name",
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
        name: "Business Name",
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
        name: "Business Name",
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

export default function HomePage() {
    const [currentView, changeView] = useState<ViewType>('Card');

    return (
        <>
            {currentView == 'Card' ?
                (<CardBoxHolder initRestaurants={restaurants} />) :
                (<></>)
            }
        </>
    );
}