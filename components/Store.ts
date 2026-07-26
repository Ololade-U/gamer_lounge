import { create } from "zustand";

interface GameQuery {
  genres: string;
  genreLabel: string;
  platform: string;
  platformLabel: string;
  store: string;
  storeLabel: string;
  developers: string;
  developerLabel: string;
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
  setStore: (store: string, storeLabel?: string) => void;
  setDeveloper: (developers: string, developerLabel?: string) => void;
}

const useGameQueryStore = create<GameQueryStore>((set) => ({
  GameQuery: {
    genres: "",
    genreLabel: "",
    platform: "",
    platformLabel: "",
    store: "",
    storeLabel: "",
    developers: "",
    developerLabel: "",
    ordering: "-added",
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
        genres: "",
        genreLabel: "",
        store: "",
        storeLabel: "",
        developers: "",
        developerLabel: "",
      },
    })),
  setGenre: (genres: string, genreLabel?: string) =>
    set((state) => ({
      GameQuery: {
        ...state.GameQuery,
        genres: genres,
        genreLabel: genreLabel ?? "",
        platform: "",
        platformLabel: "",
        store: "",
        storeLabel: "",
        developers: "",
        developerLabel: "",
      },
    })),
  setStore: (store: string, storeLabel?: string) =>
    set((state) => ({
      GameQuery: {
        ...state.GameQuery,
        store: store,
        storeLabel: storeLabel ?? "",
        platform: "",
        platformLabel: "",
        genres: "",
        genreLabel: "",
        developers: "",
        developerLabel: "",
      },
    })),
  setDeveloper: (developers: string, developerLabel?: string) =>
    set((state) => ({
      GameQuery: {
        ...state.GameQuery,
        developers: developers,
        developerLabel: developerLabel ?? "",
        platform: "",
        platformLabel: "",
        genres: "",
        genreLabel: "",
        store: "",
        storeLabel: "",
      },
    })),
}));

export default useGameQueryStore;
