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
  platforms: GamePlatform[];
}

const useGames = () => {
  const gameQuery = useGameQueryStore((s) => s.GameQuery);
  const { data, isLoading, error } = useQuery({
    queryKey: ["games", gameQuery.ordering],
    queryFn: () =>
      apiClient
        .get<FetchGamesResponse>("/api/games", {
          params: {
            ordering: gameQuery.ordering,
          },
        })
        .then((res) => res.data.results),
  });
  return { data, isLoading, error };
};

export default useGames;
