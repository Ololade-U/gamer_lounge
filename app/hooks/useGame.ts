import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/services/api-client";

interface NamedEntity {
  id: number;
  name: string;
  slug: string;
  image_background?: string;
}

interface GameStore {
  id: number;
  store: NamedEntity;
}

export interface GameDetails {
  id: number;
  slug: string;
  name: string;
  description_raw: string;
  background_image: string;
  background_image_additional?: string;
  rating: number;
  metacritic: number;
  released?: string;
  tba: boolean;
  website?: string;
  playtime: number;
  esrb_rating?: NamedEntity | null;
  genres: NamedEntity[];
  developers: NamedEntity[];
  publishers: NamedEntity[];
  platforms: { platform: NamedEntity }[];
  stores: GameStore[];
  tags: NamedEntity[];
}

const useGame = (slug: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["game", slug],
    queryFn: () =>
      apiClient
        .get<GameDetails>(`/api/games/${slug}`)
        .then((res) => res.data),
    enabled: !!slug,
  });

  return { data, isLoading, error };
};

export default useGame;
