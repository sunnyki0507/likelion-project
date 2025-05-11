"use client"

import { useEffect, useRef, useState } from "react"
import CardBox from "./CardBox"
import { getRestaurants, type RestaurantInfo } from "../(api)/getRestaurants"
import type { TagFilters as Tags } from "@/types/tags"

const cardSetting = {
  w: 870,
  h: 500,
  gap: 300,
}

const sampleTag: Tags = {
  location: "irvine",
  category: "Thai",
  distance: 5,
  ratings: 4,
  delivery: true,
  vegan: false,
}

export default function CardBoxHolder({ initRestaurants }: { initRestaurants: RestaurantInfo[] }) {
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>(initRestaurants)
  const [curIndex, setCurIndex] = useState<number>(1)
  const curIndexRef = useRef(curIndex)
  const restaurantsLengthRef = useRef(restaurants.length)
  const scrollRef = useRef<HTMLDivElement>(null)

  // capture wheel movement => curIndex++ / curIndex--
  const threshold = 400
  let scrollDelta = 0
  let scrollTimeout: ReturnType<typeof setTimeout>
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      scrollDelta += e.deltaY

      //reset scrollDelta => if user doesn't continue to scroll within 0.4 sec
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        scrollDelta = 0
      }, 400)

      if (scrollDelta >= threshold) {
        setCurIndex((prev) => (prev < restaurantsLengthRef.current ? prev + 1 : prev))
        scrollDelta = 0
      } else if (scrollDelta <= -threshold) {
        setCurIndex((prev) => (prev > 1 ? prev - 1 : prev))
        scrollDelta = 0
      }
    }

    window.addEventListener("wheel", handleWheel)
    return () => window.removeEventListener("wheel", handleWheel)
  }, [])

  // helper function for scrollToIndex / (index --> scroll xpos) convertion
  const getCurrentXpos = (index: number) => {
    return (cardSetting.w + cardSetting.gap) * index - window.innerWidth / 2 + cardSetting.w / 2
  }

  // auto scroll to Index position
  const scrollToIndex = (index: number) => {
    const el = scrollRef.current
    if (!el) return

    el.scrollTo({
      left: getCurrentXpos(index),
      behavior: "smooth",
    })
  }

  // Index change ==> auto scroll & fetch more data
  useEffect(() => {
    curIndexRef.current = curIndex

    //scroll
    scrollToIndex(curIndex)

    //fetch
    if (restaurants.length - 1 <= curIndex) {
      ;(async () => {
        const moreRestaurants = await getRestaurants({ tagFilters: sampleTag, size: 5, skip: restaurants.length })
        setRestaurants((prev) => {
          const updated = [...prev, ...moreRestaurants]
          restaurantsLengthRef.current = updated.length
          return updated
        })
      })()
    }
  }, [curIndex, restaurants.length])

  // center cardBox on window resize
  useEffect(() => {
    const handleResize = () => {
      scrollToIndex(curIndexRef.current)
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div ref={scrollRef} className="w-full h-full flex overflow-x-hidden">
      <div style={{ gap: cardSetting.gap }} className="my-auto flex flex-nowrap">
        {/* empty card at the start */}
        <div className="flex-shrink-0">
          <div
            style={{ width: cardSetting.w, height: cardSetting.h }}
            className="mx-auto bg-transparent rounded-3xl mb-6 overflow-hidden"
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
            className="mx-auto bg-transparent rounded-3xl mb-6 overflow-hidden"
          ></div>
        </div>
      </div>
    </div>
  )
}
