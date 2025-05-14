"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { MapPinIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { TagFilters } from "@/types/tags"

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  tagFilterState: [TagFilters, (tagFilters: TagFilters) => void]
}

export default function FilterModal({ isOpen, onClose, tagFilterState }: FilterModalProps) {
  const tagFiltersRef = useRef(tagFilterState[0]);
  const setTagFiltersRef = useRef(tagFilterState[1]);
  const [, forceUpdate] = useState({});
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [locations] = useState(["Irvine Spectrum Center", "Newport Beach", "Costa Mesa", "Laguna Beach", "Anaheim"]);
  const [selectedLocation, setSelectedLocation] = useState(tagFiltersRef.current.location);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const toggleCategory = (category: string) => {
    const newCategories = tagFiltersRef.current.category.includes(category)
      ? tagFiltersRef.current.category.filter(c => c !== category)
      : [...tagFiltersRef.current.category, category];
    
    const newTagFilters = {
      ...tagFiltersRef.current,
      category: newCategories
    };
    
    tagFiltersRef.current = newTagFilters;
    setTagFiltersRef.current(newTagFilters);
    forceUpdate({}); // Trigger re-render for UI update
  };

  // Update tagFilters when selectedCategories changes
  useEffect(() => {
    setTagFiltersRef.current(tagFiltersRef.current);
  }, [setTagFiltersRef, tagFiltersRef]);

  // Close modal with ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

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

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${isOpen ? 'opacity-100 backdrop-blur-sm bg-black/30 pointer-events-auto' : 'opacity-0 backdrop-blur-0 bg-black/0 pointer-events-none'
      }`}>
      <div className={`bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto transition-all duration-300 transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Customize Filters</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Location Selector */}
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
                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${location === selectedLocation ? "bg-gray-50 font-medium" : ""
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

            <button
              onClick={() => setIsSearching(true)}
              className="bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Search overlay */}
          {isSearching && (
            <div className="fixed inset-0 bg-white z-50 p-4">
              <div className="flex items-center mb-6">
                <button onClick={() => setIsSearching(false)} className="p-2 mr-2 hover:bg-gray-100 rounded-full">
                  <XMarkIcon className="w-6 h-6" />
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {/* Category Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-medium mb-4">Category</h3>
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm ${
                        tagFiltersRef.current.category.includes(category)
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Distance Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-medium mb-4">Distance</h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={tagFiltersRef.current.distance}
                    onChange={(e) => {
                      const newTagFilters = {
                        ...tagFiltersRef.current,
                        distance: e.target.value
                      };
                      tagFiltersRef.current = newTagFilters;
                      setTagFiltersRef.current(newTagFilters);
                      forceUpdate({});
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>0.0 km</span>
                    <span>10.0 km</span>
                  </div>
                </div>
              </div>

              {/* Ratings Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-medium mb-4">Ratings</h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={tagFiltersRef.current.ratings}
                    onChange={(e) => {
                      const newTagFilters = {
                        ...tagFiltersRef.current,
                        ratings: Number.parseInt(e.target.value)
                      };
                      tagFiltersRef.current = newTagFilters;
                      setTagFiltersRef.current(newTagFilters);
                      forceUpdate({});
                    }}
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
            </div>

            <div className="md:col-span-1">
              {/* Delivery and Vegan Options */}
              <div className="mb-8">
                <h3 className="text-2xl font-medium mb-4">Available for Delivery</h3>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="delivery"
                    checked={tagFiltersRef.current.delivery}
                    onChange={() => {
                      const newTagFilters = {
                        ...tagFiltersRef.current,
                        delivery: !tagFiltersRef.current.delivery
                      };
                      tagFiltersRef.current = newTagFilters;
                      setTagFiltersRef.current(newTagFilters);
                      forceUpdate({});
                    }}
                    className="w-6 h-6 text-black rounded border-gray-300 focus:ring-black"
                  />
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-medium mb-4">Vegan</h3>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="vegan"
                    checked={tagFiltersRef.current.vegan}
                    onChange={() => {
                      const newTagFilters = {
                        ...tagFiltersRef.current,
                        vegan: !tagFiltersRef.current.vegan
                      };
                      tagFiltersRef.current = newTagFilters;
                      setTagFiltersRef.current(newTagFilters);
                      forceUpdate({});
                    }}
                    className="w-6 h-6 text-black rounded border-gray-300 focus:ring-black"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
