import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/services/api-client";

interface FetchStoresResponse {
  count: number;
  results: Stores[];
}

export interface Stores {
  id: number;
  name: string;
  games_count: number;
  image_background: string;
  slug: string;
}

const useStores = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["stores"],
    queryFn: () =>
      apiClient
        .get<FetchStoresResponse>("/api/stores")
        .then((res) => res.data.results),
  });

  return { data, isLoading, error };
};

export default useStores;
