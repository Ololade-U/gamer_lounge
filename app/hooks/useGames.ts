import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/services/api-client";
import useGameQueryStore from "@/components/Store";

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

interface Platforms {
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
}

const useGames = () => {
  const ordering = useGameQueryStore((s) => s.GameQuery.ordering);
  const searchParam = useGameQueryStore((s) => s.GameQuery.searchParam);
  const { data, isLoading, error } = useQuery({
    queryKey: ["games", ordering, searchParam],
    queryFn: () =>
      apiClient
        .get<FetchGamesResponse>("/api/games", {
          params: {
            ordering: ordering,
            search: searchParam ? searchParam : "",
          },
        })
        .then((res) => res.data.results),
  });
  return { data, isLoading, error };
};

export default useGames;
