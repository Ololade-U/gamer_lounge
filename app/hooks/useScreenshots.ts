import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/services/api-client";

interface FetchScreenshotsResponse {
  count: number;
  results: Screenshot[];
}

export interface Screenshot {
  id: number;
  image: string;
  width: number;
  height: number;
}

const useScreenshots = (slug: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["screenshots", slug],
    queryFn: () =>
      apiClient
        .get<FetchScreenshotsResponse>(`/api/games/${slug}/screenshots`)
        .then((res) => res.data.results),
    enabled: !!slug,
  });

  return { data, isLoading, error };
};

export default useScreenshots;
