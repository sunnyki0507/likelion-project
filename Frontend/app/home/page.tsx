"use client"

import CardBox from "../(components)/CardBox";
import { useState } from "react";


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
];

export default function HomePage() {
    const [currentView, changeView] = useState<ViewType>('Card');

    return (
        <>
            {restaurants.map((restaurant) => {
                currentView == 'Card' ? 
                (<CardBox restaurantInfo={restaurant} key={restaurant.id} />) :
                (<CardBox restaurantInfo={restaurant} key={restaurant.id} />)
            })}
        </>
    );
}