import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/services/api-client";

interface FetchDevelopersResponse {
  count: number;
  results: Developers[];
}

export interface Developers {
  id: number;
  name: string;
  games_count: number;
  image_background: string;
  slug: string;
}

const useDevelopers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["developers"],
    queryFn: () =>
      apiClient
        .get<FetchDevelopersResponse>("/api/developers")
        .then((res) => res.data.results),
  });

  return { data, isLoading, error };
};

export default useDevelopers;
