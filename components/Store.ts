import { create } from "zustand";

interface GameQuery {
  genres: string;
  genreLabel: string;
  platform: string;
  platformLabel: string;
  ordering: string;
  searchParam: string;
  page: number;
}

interface GameQueryStore {
  GameQuery: GameQuery;
  setSortOrder: (ordering: string) => void;
  setSearchParam: (searchParam: string) => void;
  setPlatform: (platform: string, platformLabel?: string) => void;
  setGenre: (genres: string, genreLabel?: string) => void;
}

const useGameQueryStore = create<GameQueryStore>((set) => ({
  GameQuery: {
    genres: "",
    genreLabel: "",
    platform: "",
    platformLabel: "",
    ordering: "-rating",
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
  setPlatform: (platform: string, platformLabel?: string) =>
    set((state) => ({
      GameQuery: {
        ...state.GameQuery,
        platform: platform,
        platformLabel: platformLabel ?? "",
      },
    })),
  setGenre: (genres: string, genreLabel?: string) =>
    set((state) => ({
      GameQuery: {
        ...state.GameQuery,
        genres: genres,
        genreLabel: genreLabel ?? "",
      },
    })),
}));

export default useGameQueryStore;
