"use client";

import { useEffect, useRef, useState } from "react";
import CardBox from "../(components)/CardBox";

const cardSetting = {
    w: 870,
    h: 500,
    gap: 300,
};

export default function CardBoxHolder({ initRestaurants }: { initRestaurants: RestaurantInfo[] }) {

    const [restaurants, setRestaurants] = useState<RestaurantInfo[]>(initRestaurants);
    const [curIndex, setCurIndex] = useState<number>(1);
    const scrollRef = useRef<HTMLDivElement>(null);



    // capture wheel movement
    const threshold = 300;
    let scrollDelta = 0;
    let scrollTimeout: ReturnType<typeof setTimeout>;
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            scrollDelta += e.deltaY;

            //reset scrollDelta => if user doesn't continue to scroll within 0.2 sec
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                scrollDelta = 0;
            }, 400);


            if (scrollDelta >= threshold) {
                setCurIndex((prev) => (prev < restaurants.length ? prev + 1 : prev));
                scrollDelta = 0;
            } else if (scrollDelta <= -threshold) {
                setCurIndex((prev) => (prev > 1 ? prev - 1 : prev));
                scrollDelta = 0;
            }

        };

        window.addEventListener('wheel', handleWheel);
        return () => window.removeEventListener('wheel', handleWheel);
    }, []);

    const getCurrentXpos = (index: number) => {
        return (cardSetting.w + cardSetting.gap) * index - window.innerWidth / 2 + cardSetting.w / 2;
    };

    const scrollToIndex = (index: number) => {
        const el = scrollRef.current;
        if (!el) return;

        el.scrollTo({
            left: getCurrentXpos(index),
            behavior: "smooth",
        });
    };

    useEffect(() => {
        scrollToIndex(curIndex);
        console.log(scrollDelta, curIndex)
    }, [curIndex]);





    return (
        <div ref={scrollRef} className="w-full h-full flex overflow-x-auto">
            <div style={{ gap: cardSetting.gap }} className="my-auto flex flex-nowrap">

                {/* empty card at the start */}
                <div className="flex-shrink-0">
                    <div
                        style={{ width: cardSetting.w, height: cardSetting.h }}
                        className="mx-auto bg-green rounded-3xl shadow-lg mb-6 overflow-hidden"
                    ></div>
                </div>

                {restaurants.map((restaurant) => (
                    <div className="flex-shrink-0" key={restaurant.id}>
                        <CardBox restaurantInfo={restaurant} />
                    </div>
                ))}

                {/* empty card at the end */}
                <div className="flex-shrink-0">
                    <div
                        style={{ width: cardSetting.w, height: cardSetting.h }}
                        className="mx-auto bg-green rounded-3xl shadow-lg mb-6 overflow-hidden"
                    ></div>
                </div>
            </div>
        </div>
    );
}
