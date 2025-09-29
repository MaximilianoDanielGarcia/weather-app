import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FavoriteLocation } from "../types";

type FavoritesState = {
  favorites: FavoriteLocation[];
  addFavorite: (fav: FavoriteLocation) => void;
  removeFavorite: (location: string) => void;
  isFavorite: (location: string) => boolean;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (fav) => {
        const exists = get().favorites.find((f) => f.location === fav.location);
        if (!exists) {
          set((state) => ({
            favorites: [...state.favorites, fav],
          }));
        }
      },

      removeFavorite: (location) => {
        set((state) => ({
          favorites: state.favorites.filter((f) => f.location !== location),
        }));
      },

      isFavorite: (location) => {
        return get().favorites.some((f) => f.location === location);
      },
    }),
    {
      name: "weather-favorites", // Clave de localStorage
    }
  )
);
