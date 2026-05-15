import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "@/app/services/api-client";
import useGameQueryStore from "@/components/Store";

interface FetchGamesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

interface Platforms {
  id: number;
  name: string;
  slug: string;
}

interface Genre {
  id: number;
  name: string;
  slug: string;
}

interface GamePlatform {
  platform: Platforms;
}

export interface Game {
  id: number;
  name: string;
  rating: number;
  background_image: string;
  metacritic: number;
  platforms: GamePlatform[];
  released?: string;
  genres?: Genre[];
}

const useGames = () => {
  const ordering = useGameQueryStore((s) => s.GameQuery.ordering);
  const searchParam = useGameQueryStore((s) => s.GameQuery.searchParam);
  const platform = useGameQueryStore((s) => s.GameQuery.platform);
  const genres = useGameQueryStore((s) => s.GameQuery.genres);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["games", ordering, searchParam, platform, genres],
    queryFn: async ({ pageParam = 1 }: { pageParam?: number }) =>
      apiClient
        .get<FetchGamesResponse>("/api/games", {
          params: {
            ...(ordering ? { ordering } : {}),
            ...(searchParam ? { search: searchParam } : {}),
            ...(platform ? { platforms: platform } : {}),
            ...(genres ? { genres: genres } : {}),
            page: pageParam,
          },
        })
        .then((res) => res.data),
    getNextPageParam: (
      lastPage: FetchGamesResponse,
      pages: FetchGamesResponse[],
    ) => (lastPage.next ? pages.length + 1 : undefined),
    initialPageParam: 1,
  });

  const games = data?.pages.flatMap((page) => page.results);

  return {
    data: games,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default useGames;
