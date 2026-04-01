import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/services/api-client";

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

export interface Game {
  id: number;
  name: string;
  rating: number;
  background_image: string;
}

const useGames = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["games"],
    queryFn: () =>
          apiClient.get<FetchGamesResponse>("/api/games").then((res) => res.data.results),
  });
  return { data, isLoading, error };
};

export default useGames;
