"use client"

import { useState, useEffect, useRef } from "react"
import { XMarkIcon, ChevronDownIcon, CheckIcon } from "@heroicons/react/24/solid"
import { ClockIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline"
import type { TagFilters } from "@/types/tags"

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: TagFilters) => void
  initialFilters?: TagFilters
}

export default function FilterModal({ isOpen, onClose, onApply, initialFilters }: FilterModalProps) {
  console.log("FilterModal rendering - v2") // Version indicator

  // Use initialFilters if provided, otherwise use defaults
  const [distance, setDistance] = useState(initialFilters?.distance ? Number.parseFloat(initialFilters.distance) : 5)
  const [rating, setRating] = useState(initialFilters?.ratings || 0)
  const [price, setPrice] = useState(initialFilters?.price || 2)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialFilters?.category || [])
  const [customCategories, setCustomCategories] = useState<string[]>([])
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
  const [isAttributesDropdownOpen, setIsAttributesDropdownOpen] = useState(false)
  const [sortBy, setSortBy] = useState(initialFilters?.sortBy || "Best")
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>(
    initialFilters?.attributes || ["Hot & New", "Dogs allowed"],
  )

  const sortDropdownRef = useRef<HTMLDivElement>(null)
  const attributesDropdownRef = useRef<HTMLDivElement>(null)

  const [isEnteringPreference, setIsEnteringPreference] = useState(false)
  const [customPreference, setCustomPreference] = useState("")
  const customInputRef = useRef<HTMLInputElement>(null)

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
    const newFilters: TagFilters = {
      location: "92612", // Default location
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

    onApply(newFilters)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30">
      <div
        className="bg-white rounded-lg overflow-y-auto mt-[92px]"
        style={{
          width: "1121px",
          height: "839px",
          maxHeight: "calc(100vh - 120px)",
        }}
      >
        {/* Modal header */}
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
          <h2 className="text-3xl font-bold">Customize Filters</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          {/* Two-column layout with table */}
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                {/* Left column - Main filters */}
                <td className="align-top w-2/3 pr-8 border-r border-gray-200">
                  {/* Category Section */}
                  <div className="mb-12">
                    <h3 className="text-3xl font-medium mb-6">Category</h3>
                    <div className="flex flex-wrap gap-3">
                      {/* Predefined categories */}
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => toggleCategory(category)}
                          className={`px-5 py-3 rounded-full text-base ${
                            selectedCategories.includes(category)
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
                          className="px-5 py-3 rounded-full text-base bg-black text-white"
                        >
                          {category}
                        </button>
                      ))}

                      {/* Custom preference input */}
                      {isEnteringPreference ? (
                        <div className="flex items-center px-2 py-1 rounded-full bg-gray-100 min-w-[200px]">
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
                            className="bg-transparent border-none outline-none px-3 py-2 w-full"
                          />
                          <button
                            onClick={handleAddCustomPreference}
                            className="ml-2 p-1 rounded-full hover:bg-gray-200"
                          >
                            <CheckIcon className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setIsEnteringPreference(true)}
                          className="px-5 py-3 rounded-full text-base bg-gray-100 text-gray-800 hover:bg-gray-200"
                        >
                          Enter Your Preference
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Distance Section */}
                  <div className="mb-12">
                    <h3 className="text-3xl font-medium mb-6">Distance</h3>
                    <div className="px-2">
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max="10"
                          step="0.1"
                          value={distance}
                          onChange={(e) => setDistance(Number.parseFloat(e.target.value))}
                          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-base text-gray-500">
                        <span>0.0 km</span>
                        <span>10.0 km</span>
                      </div>
                    </div>
                  </div>

                  {/* Ratings Section */}
                  <div className="mb-12">
                    <h3 className="text-3xl font-medium mb-6">Ratings</h3>
                    <div className="px-2">
                      <div className="relative">
                        <input
                          type="range"
                          min="1"
                          max="5"
                          step="1"
                          value={rating}
                          onChange={(e) => setRating(Number.parseInt(e.target.value))}
                          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
                    <h3 className="text-3xl font-medium mb-6">Price</h3>
                    <div className="px-2">
                      <div className="relative">
                        <input
                          type="range"
                          min="1"
                          max="4"
                          step="1"
                          value={price}
                          onChange={(e) => setPrice(Number.parseInt(e.target.value))}
                          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-base font-medium">
                        <span>$</span>
                        <span>$$</span>
                        <span>$$$</span>
                        <span>$$$$</span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Right column - Dropdowns */}
                <td className="align-top w-1/3 pl-8">
                  <h3 className="text-2xl font-medium mb-6">Additional Options</h3>

                  {/* Sort By Dropdown */}
                  <div ref={sortDropdownRef} className="relative mb-6">
                    <button
                      onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                      className="flex items-center gap-2 px-4 py-3 border rounded-full text-base hover:bg-gray-50 w-full justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <ClockIcon className="w-5 h-5" />
                        <span>Sort by</span>
                      </div>
                      <ChevronDownIcon className="w-4 h-4" />
                    </button>

                    {isSortDropdownOpen && (
                      <div className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-lg z-20">
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
                  <div ref={attributesDropdownRef} className="relative mb-12">
                    <button
                      onClick={() => setIsAttributesDropdownOpen(!isAttributesDropdownOpen)}
                      className="flex items-center gap-2 px-4 py-3 border rounded-full text-base hover:bg-gray-50 w-full justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <ChatBubbleLeftIcon className="w-5 h-5" />
                        <span>Attributes</span>
                      </div>
                      <ChevronDownIcon className="w-4 h-4" />
                    </button>

                    {isAttributesDropdownOpen && (
                      <div className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-lg z-20">
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
                </td>
              </tr>
            </tbody>
          </table>

          {/* Apply Button */}
          <div className="flex justify-end mt-8">
            <button
              onClick={handleApply}
              className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-lg"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
// "use client"

// import { useState, useEffect } from "react"
// import { MapPinIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid"
// import { ChevronDownIcon } from "@heroicons/react/24/outline"

// export interface FilterState {
//   location: string
//   categories: string[]
//   distance: number
//   rating: number
//   delivery: boolean
//   vegan: boolean
// }

// interface FilterModalProps {
//   isOpen: boolean
//   onClose: () => void
//   onApply: (filters: FilterState) => void
// }

// export default function FilterModal({ isOpen, onClose, onApply }: FilterModalProps) {
//   const [distance, setDistance] = useState(5)
//   const [rating, setRating] = useState(2)
//   const [delivery, setDelivery] = useState(false)
//   const [vegan, setVegan] = useState(false)
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([])
//   const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false)
//   const [locations] = useState(["Irvine Spectrum Center", "Newport Beach", "Costa Mesa", "Laguna Beach", "Anaheim"])
//   const [selectedLocation, setSelectedLocation] = useState("Irvine Spectrum Center")
//   const [searchQuery, setSearchQuery] = useState("")
//   const [isSearching, setIsSearching] = useState(false)

//   const toggleCategory = (category: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
//     )
//   }

//   const handleApply = () => {
//     onApply({
//       location: selectedLocation,
//       categories: selectedCategories,
//       distance,
//       rating,
//       delivery,
//       vegan,
//     })
//     onClose()
//   }

//   useEffect(() => {
//     const handleEsc = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose()
//     }
//     window.addEventListener("keydown", handleEsc)
//     return () => window.removeEventListener("keydown", handleEsc)
//   }, [onClose])

//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "auto"
//     return () => {
//       document.body.style.overflow = "auto"
//     }
//   }, [isOpen])

//   if (!isOpen) return null

//   return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
//           <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
//               <h2 className="text-2xl font-bold">Customize Filters</h2>
//               <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
//                 <XMarkIcon className="w-6 h-6" />
//               </button>
//             </div>
    
//             <div className="p-6">
//               {/* Location Selector */}
//               <div className="flex items-center justify-between mb-8">
//                 <div className="flex items-center relative">
//                   <MapPinIcon className="w-10 h-10 text-black mr-3" />
//                   <div>
//                     <p className="text-gray-500 text-sm">Current location</p>
//                     <button
//                       onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
//                       className="flex items-center hover:bg-gray-100 rounded-md px-2 py-1 transition-colors"
//                     >
//                       <h2 className="text-xl font-medium">{selectedLocation}</h2>
//                       <ChevronDownIcon className="w-5 h-5 ml-2" />
//                     </button>
    
//                     {isLocationDropdownOpen && (
//                       <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg z-10 py-1">
//                         {locations.map((location) => (
//                           <button
//                             key={location}
//                             className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
//                               location === selectedLocation ? "bg-gray-50 font-medium" : ""
//                             }`}
//                             onClick={() => {
//                               setSelectedLocation(location)
//                               setIsLocationDropdownOpen(false)
//                             }}
//                           >
//                             {location}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
    
//                 <button
//                   onClick={() => setIsSearching(true)}
//                   className="bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors"
//                 >
//                   <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
//                 </button>
//               </div>
    
//               {/* Search overlay */}
//               {isSearching && (
//                 <div className="fixed inset-0 bg-white z-50 p-4">
//                   <div className="flex items-center mb-6">
//                     <button onClick={() => setIsSearching(false)} className="p-2 mr-2 hover:bg-gray-100 rounded-full">
//                       <XMarkIcon className="w-6 h-6" />
//                     </button>
//                     <div className="flex-1 relative">
//                       <input
//                         type="text"
//                         placeholder="Search locations..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full p-2 pl-10 border rounded-md"
//                         autoFocus
//                       />
//                       <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//                     </div>
//                   </div>
    
//                   <div className="mt-4">
//                     {locations
//                       .filter((location) => location.toLowerCase().includes(searchQuery.toLowerCase()))
//                       .map((location) => (
//                         <button
//                           key={location}
//                           className="w-full text-left p-3 hover:bg-gray-100 border-b"
//                           onClick={() => {
//                             setSelectedLocation(location)
//                             setSearchQuery("")
//                             setIsSearching(false)
//                           }}
//                         >
//                           <div className="flex items-center">
//                             <MapPinIcon className="w-5 h-5 mr-3 text-gray-500" />
//                             {location}
//                           </div>
//                         </button>
//                       ))}
//                   </div>
//                 </div>
//               )}
    
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                 <div className="md:col-span-2">
//                   {/* Category Section */}
//                   <div className="mb-8">
//                     <h3 className="text-2xl font-medium mb-4">Category</h3>
//                     <div className="flex flex-wrap gap-3">
//                       {categories.map((category) => (
//                         <button
//                           key={category}
//                           onClick={() => toggleCategory(category)}
//                           className={`px-4 py-2 rounded-full text-sm ${
//                             selectedCategories.includes(category)
//                               ? "bg-black text-white"
//                               : "bg-gray-100 text-gray-800 hover:bg-gray-200"
//                           }`}
//                         >
//                           {category}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
    
//                   {/* Distance Section */}
//                   <div className="mb-8">
//                     <h3 className="text-2xl font-medium mb-4">Distance</h3>
//                     <div className="px-2">
//                       <input
//                         type="range"
//                         min="0"
//                         max="10"
//                         step="0.1"
//                         value={distance}
//                         onChange={(e) => setDistance(Number.parseFloat(e.target.value))}
//                         className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                       />
//                       <div className="flex justify-between mt-2 text-sm text-gray-500">
//                         <span>0.0 km</span>
//                         <span>10.0 km</span>
//                       </div>
//                     </div>
//                   </div>
    
//                   {/* Ratings Section */}
//                   <div className="mb-8">
//                     <h3 className="text-2xl font-medium mb-4">Ratings</h3>
//                     <div className="px-2">
//                       <input
//                         type="range"
//                         min="1"
//                         max="5"
//                         step="1"
//                         value={rating}
//                         onChange={(e) => setRating(Number.parseInt(e.target.value))}
//                         className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                       />
//                       <div className="flex justify-between mt-2 text-sm">
//                         <div className="flex items-center">
//                           <span className="mr-1">1.0</span>
//                           <span className="text-gray-300">★★★★★</span>
//                         </div>
//                         <div className="flex items-center">
//                           <span className="mr-1">2.0</span>
//                           <span>
//                             <span className="text-yellow-400">★</span>
//                             <span className="text-gray-300">★★★★</span>
//                           </span>
//                         </div>
//                         <div className="flex items-center">
//                           <span className="mr-1">3.0</span>
//                           <span>
//                             <span className="text-yellow-400">★★</span>
//                             <span className="text-gray-300">★★★</span>
//                           </span>
//                         </div>
//                         <div className="flex items-center">
//                           <span className="mr-1">4.0</span>
//                           <span>
//                             <span className="text-yellow-400">★★★</span>
//                             <span className="text-gray-300">★★</span>
//                           </span>
//                         </div>
//                         <div className="flex items-center">
//                           <span className="mr-1">5.0</span>
//                           <span className="text-yellow-400">★★★★★</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
    
//                 <div className="md:col-span-1">
//                   {/* Delivery and Vegan Options */}
//                   <div className="mb-8">
//                     <h3 className="text-2xl font-medium mb-4">Available for Delivery</h3>
//                     <div className="flex items-center">
//                       <input
//                         type="checkbox"
//                         id="delivery"
//                         checked={delivery}
//                         onChange={() => setDelivery(!delivery)}
//                         className="w-6 h-6 text-black rounded border-gray-300 focus:ring-black"
//                       />
//                     </div>
//                   </div>
    
//                   <div className="mb-8">
//                     <h3 className="text-2xl font-medium mb-4">Vegan</h3>
//                     <div className="flex items-center">
//                       <input
//                         type="checkbox"
//                         id="vegan"
//                         checked={vegan}
//                         onChange={() => setVegan(!vegan)}
//                         className="w-6 h-6 text-black rounded border-gray-300 focus:ring-black"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
    
//               {/* Apply Button */}
//               <div className="flex justify-end mt-6">
//                 <button
//                   onClick={handleApply}
//                   className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
//                 >
//                   Apply Filters
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )
// }
