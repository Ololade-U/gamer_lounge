import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/services/api-client";

interface FetchGenresResponse {
  count: number;
  results: Genres[];
}

export interface Genres {
  id: number;
  name: string;
  games_count: number;
  image_background : string
  slug : string
}

const useGenres = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["genres"],
    queryFn: () =>
      apiClient
        .get<FetchGenresResponse>("/api/genres")
        .then((res) => res.data.results),
  });

  return { data, isLoading, error };
};

export default useGenres;
