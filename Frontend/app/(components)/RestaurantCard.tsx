import Image from "next/image"
import Link from "next/link"
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline"
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid"
import { RestaurantInfo } from "@/types/restaurant"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getUserFromToken } from "@/utils/auth";

type Props = {
  restaurant: RestaurantInfo
  onUnfavorite?: (id: string) => void
  isFavoriteView?: boolean
}



//export default function RestaurantCard({ restaurant }: { restaurant: RestaurantInfo }) {
  //return (
    //<div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
      //{/* Restaurant Image */}
      //<div className="relative h-48 w-full">
        //<Image
          //src={restaurant.image || "/placeholder.svg"}
          //alt={restaurant.name}
          //fill
          //className="object-cover"
          //priority
        ///>
        //<button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md">
          //<HeartIcon className="w-5 h-5 text-gray-700" />
        //</button>
      //</div>

export default function RestaurantCard({ restaurant, onUnfavorite, isFavoriteView = false }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Function to check favorite status
  const checkFavoriteStatus = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isInFavorites = favorites.some((fav: RestaurantInfo) => fav.id === restaurant.id);
    setIsFavorite(isInFavorites);
  };

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const user = await getUserFromToken();
  
      if (user) {
        try {
          const res = await fetch(`/api/fetchFavorites?userId=${user.id}`);
          const data = await res.json();
          const isFavorited = data.favorites?.some((fav: RestaurantInfo) => String(fav.id) === String(restaurant.id));
          setIsFavorite(isFavorited);
        } catch (err) {
          console.error("Error checking favorite status from DB:", err);
        }
      } else {
        const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
        const isInFavorites = stored.some((fav: RestaurantInfo) => String(fav.id) === String(restaurant.id));
        setIsFavorite(isInFavorites);
      }
    };
  
    checkFavoriteStatus();
  }, [restaurant.id]);
  

  const toggleFavorite = async () => {
    const user = await getUserFromToken();
    if (user) {
      try {
        const method = isFavorite ? "DELETE" : "POST";
        const response = await fetch("/api/favorites", {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            restaurant,
            restaurantId: restaurant.id,
          }),
        });

        const data = await response.json();
        if (data.success) {
          setIsFavorite(!isFavorite);
          if (onUnfavorite) {
            onUnfavorite(restaurant.id);
          }
        }
      } catch (error) {
        console.error("Error updating favorite:", error);
      }
    } else {
      // For guest mode, update localStorage
      const existing: RestaurantInfo[] = JSON.parse(localStorage.getItem("favorites") || "[]");
      const isAlreadyFavorite = existing.some(r => r.id === restaurant.id);
      
      if (isAlreadyFavorite) {
        // If it's already a favorite, remove it
        const updatedFavorites = existing.filter(r => r.id !== restaurant.id);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      } else {
        // If it's not a favorite, add it
        localStorage.setItem("favorites", JSON.stringify([...existing, restaurant]));
      }
      setIsFavorite(!isFavorite);
      if (onUnfavorite) {
        onUnfavorite(restaurant.id);
      }
    }
  };


   return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      layout
    >
      {/* Image Section */}
      <div className="relative h-48 w-full">
        <Image
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
        />
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md"
        >
          {isFavorite ? (
            <HeartSolidIcon className="w-5 h-5 text-red-500" />
          ) : (
            <HeartOutlineIcon className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>

      {/* Info Section */}
      <div className="p-5 flex-grow flex flex-col">
        <h2 className="text-xl font-bold mb-2">{restaurant.name}</h2>

        <div className="flex items-center mb-2">
          <span className="text-lg font-medium mr-2">{restaurant.rating}</span>
          <div className="flex items-center">
            <span className="text-yellow-400">{"★".repeat(Math.floor(restaurant.rating))}</span>
            <span className="text-gray-200">{"★".repeat(5 - Math.floor(restaurant.rating))}</span>
          </div>
          <span className="text-gray-500 ml-2">({restaurant.reviews})</span>
        </div>

        <div className="flex items-center text-gray-500 mb-3">
          <span>{restaurant.category}</span>
          <span className="mx-2">•</span>
          <span>{restaurant.distance}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
            {restaurant.isOpen ? "Open Now" : "Closed"}
          </span>
          {restaurant.hasDelivery && (
            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">Delivery</span>
          )}
          {restaurant.takesReservations && (
            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">Reservations</span>
          )}
        </div>

        <Link
          href={`/restaurant/${restaurant.id}`}
          className="mt-auto px-4 py-2 bg-black text-white rounded-full text-center hover:bg-gray-800 transition-colors"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  )
}