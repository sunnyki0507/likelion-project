"use client"

import { useState, useEffect } from "react"
import { getRestaurants } from "../(api)/getRestaurants"
import type { RestaurantInfo } from "@/types/restaurant"
import type { TagFilters } from "@/types/tags"
import FilterModal from "../(components)/FilterModal"

interface CustomizePageProps {
  initialRestaurants: RestaurantInfo[]
}

export default function CustomizePage({ initialRestaurants }: CustomizePageProps) {
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>(initialRestaurants)
  const [selectedLocation, setSelectedLocation] = useState("Irvine Spectrum Center")
  const [distance, setDistance] = useState(20)
  const [rating, setRating] = useState(2)
  const [price, setPrice] = useState(2)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>(["Hot & New", "Dogs allowed"])
  const [sortBy, setSortBy] = useState("Best")

  // Create initial filters object for FilterModal
  const initialFilters: TagFilters = {
    location: selectedLocation.toLowerCase(),
    category: selectedCategories,
    distance: distance.toString(),
    ratings: rating,
    //delivery: selectedAttributes.includes("Available for delivery"),
    //vegan: false,
    likes: 0,
    reviews: 0,
    description: "",
    price,
    sortBy,
    attributes: selectedAttributes,
  }

  // This function will be called when filters are applied in FilterModal
  const handleApplyFilters = (newFilters: TagFilters) => {
    // Update local state based on the new filters
    setSelectedCategories(newFilters.category || [])
    setDistance(Number.parseFloat(newFilters.distance || "20"))
    setRating(newFilters.ratings || 2)
    setPrice(newFilters.price || 2)
    setSortBy(newFilters.sortBy || "Best")
    setSelectedAttributes(newFilters.attributes || [])

    // Fetch restaurants with the new filters
    fetchRestaurants(newFilters)
  }

  const fetchRestaurants = async (filters: TagFilters) => {
    try {
      const filteredRestaurants = await getRestaurants({ tagFilters: filters, size: 3 })
      setRestaurants(filteredRestaurants)
    } catch (error) {
      console.error("Failed to fetch restaurants:", error)
    }
  }

  // For backward compatibility - keep the original useEffect
  useEffect(() => {
    const applyFilters = async () => {
      const tagFilters: TagFilters = {
        location: selectedLocation.toLowerCase(),
        category: selectedCategories,
        distance: distance.toString(),
        ratings: rating,
        //delivery: selectedAttributes.includes("Available for delivery"),
        //vegan: false,
        likes: 0,
        reviews: 0,
        description: "",
        price,
        sortBy,
        attributes: selectedAttributes,
      }

      try {
        const filteredRestaurants = await getRestaurants({ tagFilters, size: 3 })
        setRestaurants(filteredRestaurants)
      } catch (error) {
        console.error("Failed to fetch restaurants:", error)
      }
    }

    applyFilters()
  }, [distance, rating, price, selectedCategories, selectedAttributes, sortBy, selectedLocation])

  return (
    // Always show the FilterModal in page mode (not as a popup)
    <FilterModal
      isOpen={true}
      onClose={() => {
        /* No-op since we're not in modal mode */
      }}
      onApply={handleApplyFilters}
      initialFilters={initialFilters}
      initialRestaurants={restaurants}
      defaultLocation={selectedLocation}
    />
  )
}
