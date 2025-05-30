import { useEffect, useState } from "react";
import CardBox from "../(cardBox)/CardBox";
import { RestaurantInfo } from "@/types/restaurant";
import { getRestaurants } from "@/app/(api)/getRestaurants";
import { TagFilters } from "@/types/tags";
import CardBoxInfoPanel from "../(cardBox)/CardBoxInfoPanel";

interface ListBoxHolderProps {
  tagFilters: TagFilters;
}

export default function ListBoxHolder({ tagFilters }: ListBoxHolderProps) {
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [infoBoxRestaurant, setInfoBoxRestaurant] = useState<RestaurantInfo | null>(null);

  // Fetch restaurants based on tagFilters
  useEffect(() => {
    const fetchRestaurants = async () => {
      setIsLoading(true);
      const fetchedRestaurants = await getRestaurants({ tagFilters: tagFilters, size: 10, skip: 0 }); // Fetch initial set
      setRestaurants(fetchedRestaurants);
      setIsLoading(false);
    };
    fetchRestaurants();
  }, [tagFilters]); // Re-fetch when tagFilters change

  return (
    <div className="flex flex-col space-y-6 items-center">
      {isLoading ? (
        // Basic loading indicator
        <div>Loading...</div>
      ) : (
        restaurants.map((restaurant) => (
          <div key={restaurant.id}>
            <CardBox
              restaurantInfo={restaurant}
              onViewMore={() => setInfoBoxRestaurant(restaurant)}
              infoPanelOpen={infoBoxRestaurant?.id === restaurant.id}
              onCloseInfo={() => setInfoBoxRestaurant(null)}
            />
          </div>
        ))
      )}
    </div>
  );
}