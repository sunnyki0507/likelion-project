import { useEffect, useState } from "react";
import CardBox from "../(cardBox)/CardBox";
import { RestaurantInfo } from "@/types/restaurant";
import { getRestaurants } from "@/app/(api)/getRestaurants";
import { TagFilters } from "@/types/tags";
import CardBoxInfoPanel from "../(cardBox)/CardBoxInfoPanel";
import ListBox from "./ListBox";
import { ViewType } from "@/types/view";

interface ListBoxHolderProps {
  tagFilters: TagFilters;
}

export default function ListBoxHolder({ tagFilters }: ListBoxHolderProps) {
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [infoBoxRestaurant, setInfoBoxRestaurant] = useState<RestaurantInfo | null>(null);

  // Fetch restaurants based on tagFilters
  useEffect(() => {
    const fetchRestaurants = async () => {
      setIsLoading(true);
      const fetchedRestaurants = await getRestaurants({ tagFilters: tagFilters, size: 5, skip: 0 }); // Fetch initial set
      setRestaurants(fetchedRestaurants);
      setIsLoading(false);
    };
    fetchRestaurants();
  }, [tagFilters]); // Re-fetch when tagFilters change

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col px-4 py-8 max-w-screen-xl mx-auto">
      <div className="flex flex-col space-y-6 items-center w-full">
        {isLoading ? (
          // Basic loading indicator
          <div>Loading...</div>
        ) : restaurants.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">No restaurants found</div>
        ) : (
          restaurants.map((restaurant) => (
            <div key={restaurant.id} className="w-full">
              <ListBox
                restaurantInfo={restaurant}
                onViewMore={() => setInfoBoxRestaurant(restaurant)}
              />
            </div>
          ))
        )}
      </div>
      {/* Assuming you might have an info panel for ListBox too */}
      {/* {infoBoxRestaurant && (
        <ListBoxInfoPanel
          restaurant={infoBoxRestaurant}
          onClose={() => setInfoBoxRestaurant(null)}
        />
      )} */}
    </div>
  );
}
