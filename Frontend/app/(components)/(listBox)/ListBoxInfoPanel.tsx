// "use client"
// import { X } from "lucide-react"
// import type { RestaurantInfo } from "@/types/restaurant"

// interface ListBoxInfoPanelProps {
//   restaurant: RestaurantInfo
//   isOpen: boolean
//   onClose: () => void
// }

// export default function ListBoxInfoPanel({ restaurant, isOpen, onClose }: ListBoxInfoPanelProps) {
//   if (!isOpen) return null

//   // Dummy data for menus, images, and reviews (replace with real data as needed)
//   const menus = [
//     { name: "Signature Burger", img: "/placeholder.svg?height=64&width=64" },
//     { name: "Classic Fries", img: "/placeholder.svg?height=64&width=64" },
//     { name: "Milkshake", img: "/placeholder.svg?height=64&width=64" },
//     { name: "Chicken Wings", img: "/placeholder.svg?height=64&width=64" },
//     { name: "Caesar Salad", img: "/placeholder.svg?height=64&width=64" },
//     { name: "Onion Rings", img: "/placeholder.svg?height=64&width=64" },
//   ]

//   const images = [
//     "/placeholder.svg?height=120&width=120",
//     "/placeholder.svg?height=120&width=120",
//     "/placeholder.svg?height=120&width=120",
//     "/placeholder.svg?height=120&width=120",
//     "/placeholder.svg?height=120&width=120",
//     "/placeholder.svg?height=120&width=120",
//   ]

//   const reviews = [
//     {
//       user: "John D.",
//       rating: 4,
//       text: "Great food and excellent service! The burger was juicy and the fries were perfectly crispy. Will definitely come back again.",
//     },
//     {
//       user: "Sarah M.",
//       rating: 5,
//       text: "Amazing experience! The staff was friendly and the atmosphere was perfect for a family dinner. Highly recommended!",
//     },
//     {
//       user: "Mike R.",
//       rating: 4,
//       text: "Good value for money. The portions were generous and the taste was on point. The only downside was the wait time.",
//     },
//   ]

//   return (
//     <>
//       {/* Backdrop */}
//       <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />

//       {/* Modal */}
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
//           {/* Header */}
//           <div className="flex items-center justify-between p-6 border-b border-gray-200">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900">{restaurant.name}</h2>
//               <div className="flex items-center mt-1">
//                 <span className="text-lg font-semibold mr-2">{restaurant.rating}</span>
//                 <div className="flex items-center mr-2">
//                   {[...Array(5)].map((_, i) => (
//                     <span
//                       key={i}
//                       className={`text-sm ${i < Math.floor(restaurant.rating) ? "text-yellow-400" : "text-gray-200"}`}
//                     >
//                       ★
//                     </span>
//                   ))}
//                 </div>
//                 <span className="text-gray-500 text-sm">({restaurant.reviews} reviews)</span>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               aria-label="Close"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           {/* Content */}
//           <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
//             {/* Restaurant Info */}
//             <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-600 mb-1">Category</p>
//                   <p className="font-medium text-blue-500">{restaurant.category}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600 mb-1">Distance</p>
//                   <p className="font-medium">{restaurant.distance}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600 mb-1">Status</p>
//                   <p className={`font-medium ${restaurant.isOpen ? "text-green-600" : "text-red-600"}`}>
//                     {restaurant.isOpen ? "Open" : "Closed"}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600 mb-1">Services</p>
//                   <div className="flex flex-wrap gap-1">
//                     {restaurant.hasDelivery && (
//                       <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Delivery</span>
//                     )}
//                     {restaurant.takesReservations && (
//                       <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Reservations</span>
//                     )}
//                     {restaurant.hasOnlineOrder && (
//                       <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Online Order</span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Popular Menu */}
//             <div className="mb-6">
//               <div className="font-semibold text-lg mb-3 flex items-center gap-2">
//                 <span role="img" aria-label="menu">
//                   🍽️
//                 </span>{" "}
//                 Popular Menu
//               </div>
//               <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
//                 {menus.map((menu, idx) => (
//                   <div key={idx} className="flex flex-col items-center">
//                     <img
//                       src={menu.img || "/placeholder.svg"}
//                       alt={menu.name}
//                       className="w-16 h-16 rounded-xl object-cover mb-2 shadow-sm"
//                     />
//                     <div className="text-xs text-gray-700 text-center">{menu.name}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Images */}
//             <div className="mb-6">
//               <div className="font-semibold text-lg mb-3 flex items-center gap-2">
//                 <span role="img" aria-label="images">
//                   🖼️
//                 </span>{" "}
//                 Images
//               </div>
//               <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
//                 {images.map((img, idx) => (
//                   <img
//                     key={idx}
//                     src={img || "/placeholder.svg"}
//                     alt="Restaurant"
//                     className="w-full aspect-square rounded-xl object-cover shadow-sm hover:shadow-md transition-shadow cursor-pointer"
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Reviews */}
//             <div className="mb-6">
//               <div className="font-semibold text-lg mb-3 flex items-center gap-2">
//                 <span role="img" aria-label="reviews">
//                   ⭐
//                 </span>{" "}
//                 Reviews
//               </div>
//               <div className="space-y-4">
//                 {reviews.map((review, idx) => (
//                   <div key={idx} className="bg-gray-50 rounded-xl p-4">
//                     <div className="flex items-center mb-2">
//                       <span className="text-yellow-400 mr-2">{"★".repeat(review.rating)}</span>
//                       <span className="font-semibold text-gray-900">{review.user}</span>
//                     </div>
//                     <p className="text-gray-700 text-sm leading-relaxed">"{review.text}"</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
"use client"

import { X } from "lucide-react"
import type { RestaurantInfo } from "@/types/restaurant"

interface ListBoxInfoPanelProps {
  restaurant: RestaurantInfo
  isOpen: boolean
  onClose: () => void
}

export default function ListBoxInfoPanel({ restaurant, isOpen, onClose }: ListBoxInfoPanelProps) {
  if (!isOpen) return null

  // Dummy data for menus, images, and reviews (replace with real data as needed)
  const menus = [
    { name: "Signature Burger", img: "/placeholder.svg?height=80&width=80" },
    { name: "Classic Fries", img: "/placeholder.svg?height=80&width=80" },
    { name: "Milkshake", img: "/placeholder.svg?height=80&width=80" },
    { name: "Chicken Wings", img: "/placeholder.svg?height=80&width=80" },
    { name: "Caesar Salad", img: "/placeholder.svg?height=80&width=80" },
    { name: "Onion Rings", img: "/placeholder.svg?height=80&width=80" },
  ]

  const images = [
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
  ]

  const reviews = [
    {
      user: "John D.",
      rating: 4,
      text: "Great food and excellent service! The burger was juicy and the fries were perfectly crispy. Will definitely come back again!",
    },
    {
      user: "Sarah M.",
      rating: 5,
      text: "Amazing experience! The staff was friendly and the atmosphere was perfect for a family dinner. Highly recommended!",
    },
  ]

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
            <div className="flex items-center">
              <span className="text-xl font-semibold mr-2">{restaurant.rating}</span>
              <div className="flex items-center mr-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${i < Math.floor(restaurant.rating) ? "text-yellow-400" : "text-gray-200"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-gray-500">({restaurant.reviews} reviews)</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Restaurant Info Grid
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <p className="text-sm text-gray-600 mb-1">Category</p>
            <p className="font-medium text-blue-500">{restaurant.category}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Distance</p>
            <p className="font-medium">{restaurant.distance}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Status</p>
            <p className={`font-medium ${restaurant.isOpen ? "text-green-600" : "text-red-600"}`}>
              {restaurant.isOpen ? "Open" : "Closed"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Services</p>
            <div className="flex flex-wrap gap-1">
              {restaurant.hasDelivery && (
                <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">Delivery</span>
              )}
              {restaurant.takesReservations && (
                <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">Reservations</span>
              )}
              {restaurant.hasOnlineOrder && (
                <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">Online Order</span>
              )}
            </div>
          </div>
        </div> */}

        {/* Contact Information
        <div className="mb-8 space-y-4">
          <div>
            <p className="font-semibold text-gray-900 mb-1">Phone number:</p>
            <p className="text-gray-700">949-XXX-XXX</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Location:</p>
            <p className="text-gray-700">(Location zip code written here)</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Business Hour:</p>
            <p className="text-gray-700">(Business hour written here)</p>
          </div>
        </div> */}

        {/* Popular Menu */}
        <div className="mb-8">
          <div className="font-semibold text-lg mb-4 flex items-center gap-2">
            <span role="img" aria-label="menu">
              🍽️
            </span>
            Popular Menu
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {menus.map((menu, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="relative w-20 h-20 mb-2">
                  {/* Decorative background with stripes */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                    <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-gray-200 to-transparent opacity-60 rounded-xl">
                      <div
                        className="w-full h-full rounded-xl"
                        style={{
                          backgroundImage: `repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 2px,
                            rgba(0,0,0,0.1) 2px,
                            rgba(0,0,0,0.1) 4px
                          )`,
                        }}
                      />
                    </div>
                  </div>
                  {/* Circular image container */}
                  <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <img src={menu.img || "/placeholder.svg"} alt={menu.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="text-xs text-gray-700 text-center font-medium">{menu.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="mb-8">
          <div className="font-semibold text-lg mb-4 flex items-center gap-2">
            <span role="img" aria-label="images">
              📷
            </span>
            Images
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {images.map((img, idx) => (
              <div key={idx} className="relative w-20 h-20">
                {/* Decorative background with stripes */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                  <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-gray-200 to-transparent opacity-60 rounded-xl">
                    <div
                      className="w-full h-full rounded-xl"
                      style={{
                        backgroundImage: `repeating-linear-gradient(
                          45deg,
                          transparent,
                          transparent 2px,
                          rgba(0,0,0,0.1) 2px,
                          rgba(0,0,0,0.1) 4px
                        )`,
                      }}
                    />
                  </div>
                </div>
                {/* Circular image container */}
                <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <img
                    src={img || "/placeholder.svg"}
                    alt="Restaurant"
                    className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-8">
          <div className="font-semibold text-lg mb-4 flex items-center gap-2">
            <span role="img" aria-label="reviews">
              ⭐
            </span>
            Reviews
          </div>
          <div className="space-y-4">
            {reviews.map((review, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-4">
                <div className="flex items-center mb-2">
                  <span className="text-yellow-400 mr-2">{"★".repeat(review.rating)}</span>
                  <span className="font-semibold text-gray-900">{review.user}</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
