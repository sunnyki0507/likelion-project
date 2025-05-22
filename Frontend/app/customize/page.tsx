import { SiZedindustries } from "react-icons/si";
import { getRestaurants, RestaurantInfo } from "../(api)/getRestaurants"
import FilterModal from "../(components)/FilterModal"
import type { TagFilters } from "@/types/tags"
import router, { useRouter } from "next/router";
import { useState } from "react";

const DEFAULT_FILTERS: TagFilters = {
  location: "irvine",
  category: [],
  distance: "10",
  ratings: 0,
  delivery: false,
  vegan: false,
  likes: 0,
  reviews: 0,
  description: "",
  price: 2,
  sortBy: "Best",
  attributes: ["Hot & New", "Dogs allowed"]
};

const sampleTagFilters: TagFilters = {
  location: "irvine",
  category: [],
  distance: "10",
  ratings: 0,
  delivery: false,
  vegan: false,
  likes: 0,
  reviews: 0,
  description: "",
}

export default async function CustomizePageRoute() {
  const router = useRouter();

  // Fetching small sample of restaurants data to display after filtering
  //const restaurants = await getRestaurants({ tagFilters: sampleTagFilters, size: 3 })
  const restaurants = await getRestaurants({ tagFilters: DEFAULT_FILTERS, size: 3 });
  
  const handleApply = async (filters: TagFilters) => {
    // Implement filter handling logic here
    console.log("Filters applied:", filters);
    const newRestaurants = await getRestaurants({ tagFilters: filters, size: 3 });
  };

  return (
    <FilterModal
    isOpen={true}
    onClose={() => router.back()}
    onApply={handleApply}
    initialRestaurants={restaurants}
    initialFilters={DEFAULT_FILTERS}
  />
  );
}
