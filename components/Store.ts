import { create } from "zustand";

interface GameQuery {
  genres: string;
  platform: string;
  ordering: string;
  search: string;
  page: number;
}

interface GameQueryStore {
  GameQuery: GameQuery;
  setSortOrder: (ordering: string) => void;
}

const useGameQueryStore = create<GameQueryStore>((set) => ({
  GameQuery: {
    genres: "",
    platform: "",
    ordering: "rating",
    search: "",
    page: 1,
  },
  setSortOrder: (ordering: string) =>
    set((state) => ({
      GameQuery: {
        ...state.GameQuery,
        ordering: ordering,
      },
    })),
}));


export default useGameQueryStore;