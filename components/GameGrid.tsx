import useGames from "@/app/hooks/useGames";
import { SimpleGrid } from "@chakra-ui/react";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import usePlatforms from "@/app/hooks/usePlatforms";

const GameGrid = () => {
  const { data: games, isLoading, error } = useGames();

  const Skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  if (isLoading)
    return (
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xlTo2xl: 3 }}
        gap={"1rem"}
        p={{ mdDown: "0 2rem", smTo2xl: "0 0 2rem" }}
      >
        {Skeleton.map((skeleton) => (
          <GameCardSkeleton key={skeleton} />
        ))}
      </SimpleGrid>
    );
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xlTo2xl: 3 }}
        gap={"1rem"}
        p={{ mdDown: "0 2rem", smTo2xl: "0 0 2rem" }}
      >
        {games?.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
