import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EffectsStore {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useEffectsStore = create<EffectsStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id: string) => {
        set((state) => {
          const isFav = state.favorites.includes(id);
          return {
            favorites: isFav
              ? state.favorites.filter((fid) => fid !== id)
              : [...state.favorites, id],
          };
        });
      },
      isFavorite: (id: string) => {
        return get().favorites.includes(id);
      },
    }),
    {
      name: 'css-effects-favorites',
    }
  )
);
