import { useEffect, useRef } from "react";
import useGames from "@/app/hooks/useGames";
import { Box, HStack, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";

const GameGrid = () => {
  const {
    data: games,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGames();

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current || !hasNextPage) return;

    const getScrollParent = (
      element: HTMLElement | null,
    ): HTMLElement | null => {
      while (element) {
        const style = getComputedStyle(element);
        const overflowY = style.overflowY;
        if (
          (overflowY === "auto" || overflowY === "scroll") &&
          element.scrollHeight > element.clientHeight
        ) {
          return element;
        }
        element = element.parentElement;
      }
      return null;
    };

    const root = getScrollParent(sentinelRef.current.parentElement);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { root, rootMargin: "200px" },
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

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
    <Box>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xlTo2xl: 3 }}
        gap={"1rem"}
        p={{ mdDown: "0 .6rem", smTo2xl: "0 0 2rem" }}
      >
        {games?.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </SimpleGrid>
      <Box ref={sentinelRef} w="full" h="1px" />
      {isFetchingNextPage && (
        <HStack justifyContent={'center'} my={4} gap={"1rem"}>
          <Spinner size="md" />
          <Text>
            Loading
          </Text>
        </HStack>
      )}
    </Box>
  );
};

export default GameGrid;
