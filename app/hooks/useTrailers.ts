import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/services/api-client";

interface FetchTrailersResponse {
  count: number;
  results: Trailer[];
}

export interface Trailer {
  id: number;
  name: string;
  preview: string;
  data: {
    "480": string;
    max: string;
  };
}

const useTrailers = (slug: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["trailers", slug],
    queryFn: () =>
      apiClient
        .get<FetchTrailersResponse>(`/api/games/${slug}/movies`)
        .then((res) => res.data.results),
    enabled: !!slug,
  });

  return { data, isLoading, error };
};

export default useTrailers;
