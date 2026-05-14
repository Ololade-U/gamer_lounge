import { create } from "zustand";

interface GameQuery {
  genres: string;
  platform: string;
  ordering: string;
  searchParam: string;
  page: number;
}

interface GameQueryStore {
  GameQuery: GameQuery;
  setSortOrder: (ordering: string) => void;
  setSearchParam: (searchParam: string) => void;
}

const useGameQueryStore = create<GameQueryStore>((set) => ({
  GameQuery: {
    genres: "",
    platform: "",
    ordering: "",
    searchParam: "",
    page: 1,
  },
  setSortOrder: (ordering: string) =>
    set((state) => ({
      GameQuery: {
        ...state.GameQuery,
        ordering: ordering,
      },
    })),
  setSearchParam: (searchParam: string) =>
    set((state) => ({
      GameQuery: {    
        ...state.GameQuery,
        searchParam: searchParam,
      },
    })),
}));

export default useGameQueryStore;
