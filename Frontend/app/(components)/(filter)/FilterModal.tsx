"use client"

import { useState, useEffect, useRef } from "react"
import { XMarkIcon, ChevronDownIcon, CheckIcon } from "@heroicons/react/24/solid"
import { ClockIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline"
import type { TagFilters } from "@/types/tags"
import LocationSection from "./LocationSection"
import type { RestaurantInfo } from "../../(api)/getRestaurants"

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: TagFilters) => void
  initialFilters?: TagFilters
  initialRestaurants?: RestaurantInfo[]
  defaultLocation?: string // location handling
}

const categoryAliasMap: Record<string, string> = {
  "Asian Fusion": "asianfusion",
  "Carribean": "caribbean",
  "Indian": "indpak",
  "Mediterranean": "mediterranean",
  "Chinese Food": "chinese",
  "Italian": "italian",
  "Japanese": "japanese",
  "Thai": "thai"
}

export default function FilterModal({
  isOpen,
  onClose,
  onApply, // filter state action
  initialFilters, // filter state
  initialRestaurants = [],
  defaultLocation = "92612",
}: FilterModalProps) {
  // Initial state for location and restaurants
  const [selectedLocation, setSelectedLocation] = useState<string>(defaultLocation)
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>(initialRestaurants)

  //State for filters
  const [distance, setDistance] = useState(initialFilters?.distance ? Number.parseFloat(initialFilters.distance) : 5)
  const [rating, setRating] = useState(initialFilters?.ratings || 0)
  const [price, setPrice] = useState(initialFilters?.price || 2)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialFilters?.category || [])
  const [customCategories, setCustomCategories] = useState<string[]>([])
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
  const [isAttributesDropdownOpen, setIsAttributesDropdownOpen] = useState(false)
  const [sortBy, setSortBy] = useState(initialFilters?.sortBy || "Best")
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>(
    initialFilters?.attributes || [ "Open To All"],
  )

  const sortDropdownRef = useRef<HTMLDivElement>(null)
  const attributesDropdownRef = useRef<HTMLDivElement>(null)

  const [isEnteringPreference, setIsEnteringPreference] = useState(false)
  const [customPreference, setCustomPreference] = useState("")
  const customInputRef = useRef<HTMLInputElement>(null)

  function mapAttributes(userFriendly: string[]): string[] {
    const mapping: Record<string, string> = {
      "Hot & New": "hot_and_new",
      "Open for Reservation": "reservation",
      "Waitlist Reservation": "waitlist_reservation",
      "Gender Neutral Restrooms": "gender_neutral_restrooms",
      "Open To All": "open_to_all",
      //"Wheelchair Accessible": "wheelchair_accessible",
    }
  
    return userFriendly
      .map(attr => mapping[attr])
      .filter((val): val is string => Boolean(val)) // remove undefined values
  }

  function mapLocationToZipCode(location: string): string {
    const mapping: Record<string, string> = {
    "Irvine Spectrum Center": "92618",
    "South Coast Plaza": "92626",
    "The Block at Orange": "92868",
    "Fashion Island": "92660",
    }
    return mapping[location] ?? "92612" // fallback
  }


  //Handle Server-Side data
  useEffect(() => {
    if (initialRestaurants.length > 0) {
      setRestaurants(initialRestaurants)
    }
  }, [initialRestaurants])

  // Close modal with ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

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

  useEffect(() => {
    if (isEnteringPreference && customInputRef.current) {
      customInputRef.current.focus()
    }
  }, [isEnteringPreference])

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

  // Entering Preference input focus
  useEffect(() => {
    if (isEnteringPreference && customInputRef.current) {
      customInputRef.current.focus()
    }
  }, [isEnteringPreference])

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
    //"Dogs allowed",
    // "Currently Happy Hour",
    // "Available for delivery",
    "Currently Opened",
  ]

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const toggleCustomCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
      setCustomCategories(customCategories.filter((c) => c !== category))
    }
  }

  const toggleAttribute = (attribute: string) => {
    if (selectedAttributes.includes(attribute)) {
      setSelectedAttributes(selectedAttributes.filter((a) => a !== attribute))
    } else {
      setSelectedAttributes([...selectedAttributes, attribute])
    }
  }

  const handleAddCustomPreference = () => {
    if (customPreference.trim() && !selectedCategories.includes(customPreference.trim())) {
      const newCategory = customPreference.trim()
      setSelectedCategories([...selectedCategories, newCategory])
      setCustomCategories([...customCategories, newCategory])
      setCustomPreference("")
      setIsEnteringPreference(false)
    } else {
      // If the category already exists, just close the input
      setCustomPreference("")
      setIsEnteringPreference(false)
    }
  }

  const handleApply = () => {
    const mappedCategories = selectedCategories
    .map((cat) => categoryAliasMap[cat] || cat) // 매핑이 없으면 그대로 사용
    .filter((cat) => !!cat)
    const newFilters: TagFilters = {
      location: mapLocationToZipCode(selectedLocation) || "92612", // Default location
      category: mappedCategories,
      distance: distance.toString(),
      ratings: rating,
      //delivery: selectedAttributes.includes("Available for delivery"),
      //vegan: false,
      //likes: 0,
      //reviews: 0,
      //description: "",
      price,
      sortBy,
      attributes: mapAttributes(selectedAttributes),
    }

    onApply(newFilters)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className={`
      ${isOpen ? "fixed inset-0 bg-black/30 z-50" : "bg-transparent"}
      flex items-start justify-center
    `}
    >
      <div
        className={`
        bg-white opacity-95 rounded-xl overflow-none m-10 py-4 pl-4
        ${isOpen ? "mt-[92px]" : "mt-0 rounded-none"} // Remove rounded corners in page mode
      `}
        style={{
          width: isOpen ? "950px" : "100%",
          height: isOpen ? "720px" : "100vh",
        }}
        onWheel={e => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="sticky top-0 bg-white p-4 flex justify-between items-center z-10">
          <h2 className="text-2xl">Customize Filters</h2>
          {isOpen && (
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
              <XMarkIcon className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Location and Search Section */}
        <div className="bg-white rounded-lg w-full pr-4">
          <div className="px-3">
            <LocationSection selectedLocation={selectedLocation} onLocationChange={setSelectedLocation} />
          </div>
        </div>

        {/* Main content */}
        <div className="pt-6 pl-6 pr-4">
          {/* Two-column layout with table */}
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                {/* Left column - Main filters */}
                <td className="align-top w-3/4 pr-8 border-r border-gray-200">
                  {/* Category Section */}
                  <div className="mb-6">
                    <h3 className="text-xl font-medium mb-4">Category</h3>
                    <div className="flex flex-wrap gap-3">
                      {/* Predefined categories */}
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => toggleCategory(category)}
                          className={`px-4 py-2 rounded-full text-sm ${selectedCategories.includes(category)
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                        >
                          {category}
                        </button>
                      ))}

                      {/* Custom categories */}
                      {customCategories.map((category) => (
                        <button
                          key={`custom-${category}`}
                          onClick={() => toggleCustomCategory(category)}
                          className="px-4 py-2 rounded-full text-sm bg-black text-white"
                        >
                          {category}
                        </button>
                      ))}

                      {/* Custom preference input */}
                      {isEnteringPreference ? (
                        <div className="text-sm flex items-center px-2 py-1 rounded-full bg-gray-100 min-w-[200px]">
                          <input
                            ref={customInputRef}
                            type="text"
                            value={customPreference}
                            onChange={(e) => setCustomPreference(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleAddCustomPreference()
                              if (e.key === "Escape") {
                                setIsEnteringPreference(false)
                                setCustomPreference("")
                              }
                            }}
                            placeholder="Type and press Enter"
                            className="bg-transparent border-none outline-none px-3 w-full"
                          />
                          <button
                            onClick={handleAddCustomPreference}
                            className="ml-2 p-1 rounded-full hover:bg-gray-200"
                          >
                            <CheckIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setIsEnteringPreference(true)}
                          className="px-4 py-2 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200"
                        >
                          Enter Your Preference
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Distance Section */}
                  <div className="mb-6">
                    <h3 className="text-xl font-medium mb-2">Distance</h3>
                    <div className="px-2">
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max="10"
                          step="0.1"
                          value={distance}
                          onChange={(e) => setDistance(Number.parseFloat(e.target.value))}
                          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-0"
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-base text-black">
                        <span>0.0 km</span>
                        <span>10.0 km</span>
                      </div>
                    </div>
                  </div>

                  {/* Ratings Section */}
                  <div className="mb-6">
                    <h3 className="text-xl font-medium mb-2">Ratings</h3>
                    <div className="px-2">
                      <div className="relative">
                        <input
                          type="range"
                          min="1"
                          max="5"
                          step="1"
                          value={rating}
                          onChange={(e) => setRating(Number.parseInt(e.target.value))}
                          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-0"
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-base">
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
                  <div className="mb-12">
                    <h3 className="text-xl font-medium mb-2">Price</h3>
                    <div className="px-2">
                      <div className="relative">
                        <input
                          type="range"
                          min="1"
                          max="4"
                          step="1"
                          value={price}
                          onChange={(e) => setPrice(Number.parseInt(e.target.value))}
                          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-0"
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-base font-medium">
                        <span>$</span>
                        <span>&#160;&#160;&#160;&#160;&#160;$$</span>
                        <span>&#160;&#160;$$$</span>
                        <span>$$$$</span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Right column - Dropdowns */}
                <td className="align-top w-1/4 pl-6">
                  <h3 className="text-xl font-base mb-6">Additional Options</h3>

                  {/* Sort By Dropdown */}
                  <div ref={sortDropdownRef} className="relative mb-6">
                    <button
                      onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                      className="flex items-center gap-2 px-4 py-2 border rounded-full text-base hover:bg-gray-50 w-full justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <ClockIcon className="w-5 h-5" />
                        <span>Sort by</span>
                      </div>
                      <ChevronDownIcon className="w-4 h-4" />
                    </button>

                    {isSortDropdownOpen && (
                      <div className="absolute text-sm left-0 mt-2 w-full bg-white rounded-md shadow-lg z-20">
                        {sortOptions.map((option) => (
                          <button
                            key={option}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center ${option === sortBy ? "font-sm" : ""
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
                  <div ref={attributesDropdownRef} className="relative mb-12">
                    <button
                      onClick={() => setIsAttributesDropdownOpen(!isAttributesDropdownOpen)}
                      className="flex items-center gap-2 px-4 py-2 border rounded-full text-base hover:bg-gray-50 w-full justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <ChatBubbleLeftIcon className="w-5 h-5" />
                        <span>Attributes</span>
                      </div>
                      <ChevronDownIcon className="w-4 h-4" />
                    </button>

                    {isAttributesDropdownOpen && (
                      <div className="absolute text-sm left-0 mt-2 w-full bg-white rounded-md shadow-lg z-20">
                        {attributeOptions.map((option) => (
                          <button
                            key={option}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center ${selectedAttributes.includes(option) ? "font-sm" : ""
                              }`}
                            onClick={() => toggleAttribute(option)}
                          >
                            <div className="w-6 h-6 mr-2 flex items-center justify-center">
                              {selectedAttributes.includes(option) ? (
                                <CheckIcon className="w-5 h-5" />
                              ) : (
                                <div className="w-5 h-5"></div>
                              )}
                            </div>
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>


                  {/* Apply Button */}
                  <div className="flex mt-[320px] ml-14">
                    <button
                      onClick={handleApply}
                      className="px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-base"
                    >
                      Apply Filters
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}