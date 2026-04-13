import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/services/api-client";

interface FetchPlatformsResponse {
  count: number;
  results: Platforms[];
}

export interface Platforms {
  id: number;
  name: string;
  image: string;
  games_count: number;
  image_background : string
  slug : string
}

const usePlatforms = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["platforms"],
    queryFn: () =>
      apiClient
        .get<FetchPlatformsResponse>("/api/platforms")
        .then((res) => res.data.results),
  });

  return { data, isLoading, error };
};

export default usePlatforms;
