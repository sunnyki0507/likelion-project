"use client"

import { useState } from "react";
import CardBoxHolder from "./CardBoxHolder";


export default function ViewSelector({ initRestaurants }: { initRestaurants: RestaurantInfo[] }) {
    const [currentView, changeView] = useState<ViewType>('Card');

    return (
        <>
            {currentView == 'Card' ?
                (<CardBoxHolder initRestaurants={initRestaurants} />) :
                (<></>)
            }
        </>
    );
}


