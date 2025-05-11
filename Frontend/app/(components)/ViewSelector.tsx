"use client"

import { useState } from "react";
import CardBoxHolder from "./CardBoxHolder";
import { RestaurantInfo } from "../(api)/getRestaurants";
import { ViewType } from "@/types/view";


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


