"use client"

import { useState, useEffect, useRef } from "react"
import { MapPinIcon, MagnifyingGlassIcon, ChevronDownIcon, CheckIcon } from "@heroicons/react/24/solid"
import { ClockIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { getRestaurants } from "../(api)/getRestaurants"
import type { RestaurantInfo } from "@/types/restaurant"
import type { TagFilters } from "@/types/tags"

interface FilterPageProps {
  initialRestaurants: RestaurantInfo[]
}

export default function FilterPage({ initialRestaurants }: FilterPageProps) {
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>(initialRestaurants)
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false)
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
  const [isAttributesDropdownOpen, setIsAttributesDropdownOpen] = useState(false)
  const [locations] = useState(["Irvine Spectrum Center", "Newport Beach", "Costa Mesa", "Laguna Beach", "Anaheim"])
  const [selectedLocation, setSelectedLocation] = useState("Irvine Spectrum Center")
  const [distance, setDistance] = useState(10)
  const [rating, setRating] = useState(2)
  const [price, setPrice] = useState(2)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>(["Hot & New", "Dogs allowed"])
  const [sortBy, setSortBy] = useState("Best")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const sortDropdownRef = useRef<HTMLDivElement>(null)
  const attributesDropdownRef = useRef<HTMLDivElement>(null)

  // front and back mapping func
  function mapAttributes(userFriendly: string[]): string[] {
    const mapping: Record<string, string> = {
      "Hot & New": "hot_and_new",
      "Open for Reservation": "reservation",
      "Waitlist Reservation": "waitlist_reservation",
      "Gender Neutral Restrooms": "gender_neutral_restrooms",
      "Open To All": "open_to_all",
      "Wheelchair Accessible": "wheelchair_accessible",
    }
  
    return userFriendly
      .map(attr => mapping[attr])
      .filter((val): val is string => Boolean(val)) // remove undefined values
  }
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortDropdownOpen(false)
      }
      if (attributesDropdownRef.current && !attributesDropdownRef.current.contains(event.target as Node)) {
        setIsAttributesDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Apply filters when they change
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
        attributes: mapAttributes(selectedAttributes),
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

  const categories = [
    "Asian Fusion",
    "Carribean",
    "Indian",
    "Mediterranean",
    "Chinese Food",
    "Italian",
    "Japanese",
    "Thai",
  ]

  const sortOptions = ["Best", "Ratings", "Number of Reviews", "Distance"]

  const attributeOptions = [
    "Hot & New",
    "Open for Reservation",
    "Waitlist Reservation",
    "Dogs allowed",
    "Currently Happy Hour",
    "Available for delivery",
    "Currently Opened",
  ]

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const toggleAttribute = (attribute: string) => {
    if (selectedAttributes.includes(attribute)) {
      setSelectedAttributes(selectedAttributes.filter((a) => a !== attribute))
    } else {
      setSelectedAttributes([...selectedAttributes, attribute])
    }
  }

  return (
    <div className="w-full px-4 py-8 max-w-screen-xl mx-auto">
      {/* Location and Search Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center relative">
          <MapPinIcon className="w-10 h-10 text-black mr-3" />
          <div>
            <p className="text-gray-500 text-sm">Current location</p>
            <button
              onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
              className="flex items-center hover:bg-gray-100 rounded-md px-2 py-1 transition-colors"
            >
              <h2 className="text-xl font-medium">{selectedLocation}</h2>
              <ChevronDownIcon className="w-5 h-5 ml-2" />
            </button>

            {isLocationDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg z-10 py-1">
                {locations.map((location) => (
                  <button
                    key={location}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      location === selectedLocation ? "bg-gray-50 font-medium" : ""
                    }`}
                    onClick={() => {
                      setSelectedLocation(location)
                      setIsLocationDropdownOpen(false)
                    }}
                  >
                    {location}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Search button */}
          <button
            onClick={() => setIsSearching(true)}
            className="bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Search overlay */}
      {isSearching && (
        <div className="fixed inset-0 bg-white z-50 p-4">
          <div className="flex items-center mb-6">
            <button onClick={() => setIsSearching(false)} className="p-2 mr-2 hover:bg-gray-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 pl-10 border rounded-md"
                autoFocus
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <div className="mt-4">
            {locations
              .filter((location) => location.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((location) => (
                <button
                  key={location}
                  className="w-full text-left p-3 hover:bg-gray-100 border-b"
                  onClick={() => {
                    setSelectedLocation(location)
                    setSearchQuery("")
                    setIsSearching(false)
                  }}
                >
                  <div className="flex items-center">
                    <MapPinIcon className="w-5 h-5 mr-3 text-gray-500" />
                    {location}
                  </div>
                </button>
              ))}
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Filters */}
        <div className="w-full md:w-2/3 space-y-10">
          {/* Category Section */}
          <div>
            <h3 className="text-2xl font-medium mb-4">Category</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    selectedCategories.includes(category)
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
              <button className="px-4 py-2 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200">
                Enter Your Preference
              </button>
            </div>
          </div>

          {/* Distance Section */}
          <div>
            <h3 className="text-2xl font-medium mb-4">Distance</h3>
            <div className="px-2">
              <input
                type="range"
                min="0"
                max="40"
                step="1"
                value={distance}
                onChange={(e) => setDistance(Number.parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>0.0 km</span>
                <span>40000 m</span>
              </div>
            </div>
          </div>

          {/* Ratings Section */}
          <div>
            <h3 className="text-2xl font-medium mb-4">Ratings</h3>
            <div className="px-2">
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={rating}
                onChange={(e) => setRating(Number.parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-sm">
                <div className="flex items-center">
                  <span className="mr-1">1.0</span>
                  <span className="text-gray-300">★★★★★</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-1">2.0</span>
                  <span>
                    <span className="text-yellow-400">★</span>
                    <span className="text-gray-300">★★★★</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="mr-1">3.0</span>
                  <span>
                    <span className="text-yellow-400">★★</span>
                    <span className="text-gray-300">★★★</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="mr-1">4.0</span>
                  <span>
                    <span className="text-yellow-400">★★★</span>
                    <span className="text-gray-300">★★</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="mr-1">5.0</span>
                  <span className="text-yellow-400">★★★★★</span>
                </div>
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div>
            <h3 className="text-2xl font-medium mb-4">Price</h3>
            <div className="px-2">
              <input
                type="range"
                min="1"
                max="4"
                step="1"
                value={price}
                onChange={(e) => setPrice(Number.parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-sm font-medium">
                <span>$</span>
                <span>$$</span>
                <span>$$$</span>
                <span>$$$$</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Sort and Attributes */}
        <div className="w-full md:w-1/3">
          {/* Sort By Dropdown */}
          <div ref={sortDropdownRef} className="relative mb-6">
            <button
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm hover:bg-gray-50 w-full justify-between"
            >
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5" />
                <span>Sort by</span>
              </div>
              <ChevronDownIcon className="w-4 h-4" />
            </button>

            {isSortDropdownOpen && (
              <div className="absolute right-0 mt-2 w-full bg-white rounded-md shadow-lg z-20">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center ${
                      option === sortBy ? "font-medium" : ""
                    }`}
                    onClick={() => {
                      setSortBy(option)
                      setIsSortDropdownOpen(false)
                    }}
                  >
                    <div className="w-6 h-6 mr-2 flex items-center justify-center">
                      {option === sortBy ? (
                        <div className="w-4 h-4 rounded-full border-2 border-black flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-black"></div>
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                      )}
                    </div>
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Attributes Dropdown */}
          <div ref={attributesDropdownRef} className="relative">
            <button
              onClick={() => setIsAttributesDropdownOpen(!isAttributesDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm hover:bg-gray-50 w-full justify-between"
            >
              <div className="flex items-center gap-2">
                <AdjustmentsHorizontalIcon className="w-5 h-5" />
                <span>Attributes</span>
              </div>
              <ChevronDownIcon className="w-4 h-4" />
            </button>

            {isAttributesDropdownOpen && (
              <div className="absolute right-0 mt-2 w-full bg-white rounded-md shadow-lg z-20">
                {attributeOptions.map((option) => (
                  <button
                    key={option}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center ${
                      selectedAttributes.includes(option) ? "font-medium" : ""
                    }`}
                    onClick={() => toggleAttribute(option)}
                  >
                    <div className="w-6 h-6 mr-2 flex items-center justify-center">
                      {selectedAttributes.includes(option) ? (
                        <div className="w-5 h-5 bg-black text-white flex items-center justify-center">
                          <CheckIcon className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 border border-gray-300"></div>
                      )}
                    </div>
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Preview of filtered restaurants */}
          <div className="mt-8">
            <h3 className="text-xl font-medium mb-4">Preview Results</h3>
            <div className="space-y-4">
              {restaurants.map((restaurant) => (
                <div key={restaurant.id} className="p-4 border rounded-lg">
                  <h4 className="font-bold">{restaurant.name}</h4>
                  <div className="flex items-center mt-1">
                    <span className="text-lg font-medium mr-2">{restaurant.rating}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-400">{"★".repeat(Math.floor(restaurant.rating))}</span>
                      <span className="text-gray-200">{"★".repeat(5 - Math.floor(restaurant.rating))}</span>
                    </div>
                    <span className="text-gray-500 ml-2">({restaurant.reviews})</span>
                  </div>
                  <div className="mt-2">
                    <Link href={`/restaurant/${restaurant.id}`} className="text-blue-500 hover:underline">
                      View details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
