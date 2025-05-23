// "use client"

// import { useState, useEffect, useRef } from "react"
// import Link from "next/link"
// import { MapPinIcon, MagnifyingGlassIcon, ChevronDownIcon } from "@heroicons/react/24/solid"
// import { ClockIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline"
// import { getRestaurants } from "../(api)/getRestaurants"
// import type { RestaurantInfo } from "@/types/restaurant"
// import type { TagFilters } from "@/types/tags"

// interface CustomizePageProps {
//   initialRestaurants: RestaurantInfo[]
// }

// export default function CustomizePage({ initialRestaurants }: CustomizePageProps) {
//   const [restaurants, setRestaurants] = useState<RestaurantInfo[]>(initialRestaurants)
//   const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false)
//   const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
//   const [isAttributesDropdownOpen, setIsAttributesDropdownOpen] = useState(false)
//   const [locations] = useState(["Irvine Spectrum Center", "Newport Beach", "Costa Mesa", "Laguna Beach", "Anaheim"])
//   const [selectedLocation, setSelectedLocation] = useState("Irvine Spectrum Center")
//   const [distance, setDistance] = useState(20) // Default to middle of slider
//   const [rating, setRating] = useState(2) // Default to 2.0
//   const [price, setPrice] = useState(2) // Default to $$
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([])
//   const [selectedAttributes, setSelectedAttributes] = useState<string[]>(["Hot & New", "Dogs allowed"])
//   const [sortBy, setSortBy] = useState("Best")

//   const sortDropdownRef = useRef<HTMLDivElement>(null)
//   const attributesDropdownRef = useRef<HTMLDivElement>(null)

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
//         setIsSortDropdownOpen(false)
//       }
//       if (attributesDropdownRef.current && !attributesDropdownRef.current.contains(event.target as Node)) {
//         setIsAttributesDropdownOpen(false)
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => document.removeEventListener("mousedown", handleClickOutside)
//   }, [])

//   // Apply filters when they change
//   useEffect(() => {
//     const applyFilters = async () => {
//       const tagFilters: TagFilters = {
//         location: selectedLocation.toLowerCase(),
//         category: selectedCategories,
//         distance: distance.toString(),
//         ratings: rating,
//         delivery: selectedAttributes.includes("Available for delivery"),
//         vegan: false,
//         likes: 0,
//         reviews: 0,
//         description: "",
//         price,
//         sortBy,
//         attributes: selectedAttributes,
//       }

//       try {
//         const filteredRestaurants = await getRestaurants({ tagFilters, size: 3 })
//         setRestaurants(filteredRestaurants)
//       } catch (error) {
//         console.error("Failed to fetch restaurants:", error)
//       }
//     }

//     applyFilters()
//   }, [distance, rating, price, selectedCategories, selectedAttributes, sortBy, selectedLocation])

//   const categories = [
//     "Asian Fusion",
//     "Carribean",
//     "Indian",
//     "Mediterranean",
//     "Chinese Food",
//     "Italian",
//     "Japanese",
//     "Thai",
//   ]

//   const sortOptions = ["Best", "Ratings", "Number of Reviews", "Distance"]

//   const attributeOptions = [
//     "Hot & New",
//     "Open for Reservation",
//     "Waitlist Reservation",
//     "Dogs allowed",
//     "Currently Happy Hour",
//     "Available for delivery",
//     "Currently Opened",
//   ]

//   const toggleCategory = (category: string) => {
//     if (selectedCategories.includes(category)) {
//       setSelectedCategories(selectedCategories.filter((c) => c !== category))
//     } else {
//       setSelectedCategories([...selectedCategories, category])
//     }
//   }

//   const toggleAttribute = (attribute: string) => {
//     if (selectedAttributes.includes(attribute)) {
//       setSelectedAttributes(selectedAttributes.filter((a) => a !== attribute))
//     } else {
//       setSelectedAttributes([...selectedAttributes, attribute])
//     }
//   }

//   return (
//     <div className="w-full max-w-screen-xl mx-auto px-6 py-8">
//       {/* Location and Search Section */}
//       <div className="flex items-center justify-between mb-8">
//         <div className="flex items-center relative">
//           <div className="bg-black rounded-full p-3 mr-3">
//             <MapPinIcon className="w-6 h-6 text-white" />
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">Current location</p>
//             <button
//               onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
//               className="flex items-center hover:bg-gray-100 rounded-md px-2 py-1 transition-colors"
//             >
//               <h2 className="text-xl font-medium">{selectedLocation}</h2>
//               <ChevronDownIcon className="w-5 h-5 ml-2" />
//             </button>

//             {isLocationDropdownOpen && (
//               <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg z-10 py-1">
//                 {locations.map((location) => (
//                   <button
//                     key={location}
//                     className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
//                       location === selectedLocation ? "bg-gray-50 font-medium" : ""
//                     }`}
//                     onClick={() => {
//                       setSelectedLocation(location)
//                       setIsLocationDropdownOpen(false)
//                     }}
//                   >
//                     {location}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="flex items-center gap-4">
//           {/* Search button */}
//           <button className="bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors">
//             <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
//           </button>
//         </div>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Left side - Filters */}
//         <div className="w-full lg:w-2/3 space-y-10">
//           {/* Category Section */}
//           <div>
//             <h3 className="text-2xl font-medium mb-4">Category</h3>
//             <div className="flex flex-wrap gap-3">
//               {categories.map((category) => (
//                 <button
//                   key={category}
//                   onClick={() => toggleCategory(category)}
//                   className={`px-4 py-2 rounded-full text-sm ${
//                     selectedCategories.includes(category)
//                       ? "bg-black text-white"
//                       : "bg-gray-100 text-gray-800 hover:bg-gray-200"
//                   }`}
//                 >
//                   {category}
//                 </button>
//               ))}
//               <button className="px-4 py-2 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200">
//                 Enter Your Preference
//               </button>
//             </div>
//           </div>

//           {/* Distance Section */}
//           <div>
//             <h3 className="text-2xl font-medium mb-4">Distance</h3>
//             <div className="px-2">
//               <div className="relative">
//                 <input
//                   type="range"
//                   min="0"
//                   max="40"
//                   step="1"
//                   value={distance}
//                   onChange={(e) => setDistance(Number.parseFloat(e.target.value))}
//                   className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                 />
//                 <div className="absolute top-0 left-0 right-0 h-1 pointer-events-none">
//                   <div
//                     className="absolute top-0 left-0 h-full bg-black rounded-l-lg"
//                     style={{ width: `${(distance / 40) * 100}%` }}
//                   ></div>
//                 </div>
//               </div>
//               <div className="flex justify-between mt-2 text-sm text-gray-500">
//                 <span>0.0 km</span>
//                 <span>40000 m</span>
//               </div>
//             </div>
//           </div>

//           {/* Ratings Section */}
//           <div>
//             <h3 className="text-2xl font-medium mb-4">Ratings</h3>
//             <div className="px-2">
//               <div className="relative">
//                 <div className="flex justify-between mb-2">
//                   <div className="w-1 h-4 bg-black"></div>
//                   <div className="w-1 h-4 bg-black"></div>
//                   <div className="w-1 h-4 bg-black"></div>
//                   <div className="w-1 h-4 bg-black"></div>
//                   <div className="w-1 h-4 bg-black"></div>
//                 </div>
//                 <input
//                   type="range"
//                   min="1"
//                   max="5"
//                   step="1"
//                   value={rating}
//                   onChange={(e) => setRating(Number.parseInt(e.target.value))}
//                   className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                 />
//                 <div className="absolute top-6 left-0 right-0 h-1 pointer-events-none">
//                   <div
//                     className="absolute top-0 left-0 h-full bg-black rounded-l-lg"
//                     style={{ width: `${((rating - 1) / 4) * 100}%` }}
//                   ></div>
//                 </div>
//               </div>
//               <div className="flex justify-between mt-2 text-sm">
//                 <div className="flex items-center">
//                   <span className="mr-1">1.0</span>
//                   <span className="text-gray-300">★★★★★</span>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="mr-1">2.0</span>
//                   <span>
//                     <span className="text-yellow-400">★</span>
//                     <span className="text-gray-300">★★★★</span>
//                   </span>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="mr-1">3.0</span>
//                   <span>
//                     <span className="text-yellow-400">★★</span>
//                     <span className="text-gray-300">★★★</span>
//                   </span>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="mr-1">4.0</span>
//                   <span>
//                     <span className="text-yellow-400">★★★</span>
//                     <span className="text-gray-300">★★</span>
//                   </span>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="mr-1">5.0</span>
//                   <span className="text-yellow-400">★★★★★</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Price Section */}
//           <div>
//             <h3 className="text-2xl font-medium mb-4">Price</h3>
//             <div className="px-2">
//               <div className="relative">
//                 <div className="flex justify-between mb-2">
//                   <div className="w-1 h-4 bg-black"></div>
//                   <div className="w-1 h-4 bg-black"></div>
//                   <div className="w-1 h-4 bg-black"></div>
//                   <div className="w-1 h-4 bg-black"></div>
//                 </div>
//                 <input
//                   type="range"
//                   min="1"
//                   max="4"
//                   step="1"
//                   value={price}
//                   onChange={(e) => setPrice(Number.parseInt(e.target.value))}
//                   className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                 />
//                 <div className="absolute top-6 left-0 right-0 h-1 pointer-events-none">
//                   <div
//                     className="absolute top-0 left-0 h-full bg-black rounded-l-lg"
//                     style={{ width: `${((price - 1) / 3) * 100}%` }}
//                   ></div>
//                 </div>
//               </div>
//               <div className="flex justify-between mt-2 text-sm font-medium">
//                 <span>$</span>
//                 <span>$$</span>
//                 <span>$$$</span>
//                 <span>$$$$</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right side - Sort and Attributes */}
//         <div className="w-full lg:w-1/3">
//           {/* Sort By Dropdown */}
//           <div ref={sortDropdownRef} className="relative mb-6">
//             <button
//               onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
//               className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm hover:bg-gray-50 w-full justify-between"
//             >
//               <div className="flex items-center gap-2">
//                 <ClockIcon className="w-5 h-5" />
//                 <span>Sort by</span>
//               </div>
//               <ChevronDownIcon className="w-4 h-4" />
//             </button>

//             {isSortDropdownOpen && (
//               <div className="absolute right-0 mt-2 w-full bg-white rounded-md shadow-lg z-20">
//                 {sortOptions.map((option) => (
//                   <button
//                     key={option}
//                     className={`w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center ${
//                       option === sortBy ? "font-medium" : ""
//                     }`}
//                     onClick={() => {
//                       setSortBy(option)
//                       setIsSortDropdownOpen(false)
//                     }}
//                   >
//                     <div className="w-6 h-6 mr-2 flex items-center justify-center">
//                       {option === sortBy ? (
//                         <div className="w-4 h-4 rounded-full border-2 border-black flex items-center justify-center">
//                           <div className="w-2 h-2 rounded-full bg-black"></div>
//                         </div>
//                       ) : (
//                         <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
//                       )}
//                     </div>
//                     {option}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Attributes Dropdown */}
//           <div ref={attributesDropdownRef} className="relative">
//             <button
//               onClick={() => setIsAttributesDropdownOpen(!isAttributesDropdownOpen)}
//               className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm hover:bg-gray-50 w-full justify-between"
//             >
//               <div className="flex items-center gap-2">
//                 <ChatBubbleLeftIcon className="w-5 h-5" />
//                 <span>Attributes</span>
//               </div>
//               <ChevronDownIcon className="w-4 h-4" />
//             </button>

//             {isAttributesDropdownOpen && (
//               <div className="absolute right-0 mt-2 w-full bg-white rounded-md shadow-lg z-20">
//                 {attributeOptions.map((option) => (
//                   <button
//                     key={option}
//                     className={`w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center ${
//                       selectedAttributes.includes(option) ? "font-medium" : ""
//                     }`}
//                     onClick={() => toggleAttribute(option)}
//                   >
//                     <div className="w-6 h-6 mr-2 flex items-center justify-center">
//                       {selectedAttributes.includes(option) ? (
//                         <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
//                         </svg>
//                       ) : (
//                         <div className="w-5 h-5 border border-gray-300"></div>
//                       )}
//                     </div>
//                     {option}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Preview of filtered restaurants */}
//           <div className="mt-8">
//             <h3 className="text-xl font-medium mb-4">Preview Results</h3>
//             <div className="space-y-4">
//               {restaurants.map((restaurant) => (
//                 <div key={restaurant.id} className="p-4 border rounded-lg">
//                   <h4 className="font-bold">{restaurant.name}</h4>
//                   <div className="flex items-center mt-1">
//                     <span className="text-lg font-medium mr-2">{restaurant.rating}</span>
//                     <div className="flex items-center">
//                       <span className="text-yellow-400">{"★".repeat(Math.floor(restaurant.rating))}</span>
//                       <span className="text-gray-200">{"★".repeat(5 - Math.floor(restaurant.rating))}</span>
//                     </div>
//                     <span className="text-gray-500 ml-2">({restaurant.reviews})</span>
//                   </div>
//                   <div className="mt-2">
//                     <Link href={`/restaurant/${restaurant.id}`} className="text-blue-500 hover:underline">
//                       View details
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-16 pt-8 border-t border-gray-200">
//         <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
//           <Link href="#" className="hover:text-gray-900">
//             Help Center
//           </Link>
//           <Link href="#" className="hover:text-gray-900">
//             Terms of Service
//           </Link>
//           <Link href="#" className="hover:text-gray-900">
//             Privacy Policy
//           </Link>
//           <Link href="#" className="hover:text-gray-900">
//             Cookie Policy
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }
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
    delivery: selectedAttributes.includes("Available for delivery"),
    vegan: false,
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
        delivery: selectedAttributes.includes("Available for delivery"),
        vegan: false,
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
