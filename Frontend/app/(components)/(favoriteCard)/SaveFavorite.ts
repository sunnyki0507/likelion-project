import { RestaurantInfo } from "@/types/restaurant";

export const saveFavoriteRestaurant = (restaurant: RestaurantInfo) => {
  const favorites = getFavoriteRestaurants();
  if (!favorites.some(fav => fav.id === restaurant.id)) {
    favorites.push(restaurant);
    localStorage.setItem('favoriteRestaurants', JSON.stringify(favorites));
  }
};

export const getFavoriteRestaurants = (): RestaurantInfo[] => {
  const favorites = localStorage.getItem('favoriteRestaurants');
  return favorites ? JSON.parse(favorites) : [];
};

export const deleteFavoriteRestaurant = (restaurantId: string) => {
  const favorites = getFavoriteRestaurants();
  const updatedFavorites = favorites.filter(fav => fav.id !== restaurantId);
  localStorage.setItem('favoriteRestaurants', JSON.stringify(updatedFavorites));
};
