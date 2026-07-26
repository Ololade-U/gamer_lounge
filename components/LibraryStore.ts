import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SavedGame {
  id: number;
  slug: string;
  name: string;
  background_image: string;
  rating: number;
  metacritic: number;
}

interface LibraryStore {
  wishlist: SavedGame[];
  library: SavedGame[];
  toggleWishlist: (game: SavedGame) => void;
  toggleLibrary: (game: SavedGame) => void;
  isInWishlist: (id: number) => boolean;
  isInLibrary: (id: number) => boolean;
}

const useLibraryStore = create<LibraryStore>()(
  persist(
    (set, get) => ({
      wishlist: [],
      library: [],
      toggleWishlist: (game) =>
        set((state) => {
          const exists = state.wishlist.some((g) => g.id === game.id);
          return {
            wishlist: exists
              ? state.wishlist.filter((g) => g.id !== game.id)
              : [...state.wishlist, game],
          };
        }),
      toggleLibrary: (game) =>
        set((state) => {
          const exists = state.library.some((g) => g.id === game.id);
          return {
            library: exists
              ? state.library.filter((g) => g.id !== game.id)
              : [...state.library, game],
          };
        }),
      isInWishlist: (id) => get().wishlist.some((g) => g.id === id),
      isInLibrary: (id) => get().library.some((g) => g.id === id),
    }),
    { name: "gamr-library-storage" },
  ),
);

export default useLibraryStore;
