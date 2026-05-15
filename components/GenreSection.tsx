import {
  Box,
  Collapsible,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useState } from "react";
import { useColorMode } from "./ui/color-mode";
import useGenres, { Genres } from "@/app/hooks/useGenre";
import useGameQueryStore from "./Store";

const GenreSection = () => {
  const { colorMode } = useColorMode();
  const { data: genres, isLoading } = useGenres();
  const selectedGenre = useGameQueryStore((s) => s.GameQuery.genres);
  const setGenre = useGameQueryStore((s) => s.setGenre);
  const setSortOrder = useGameQueryStore((s) => s.setSortOrder);
  const [showAllGenres, setShowAllGenres] = useState(false);
  const [isToggleHovered, setIsToggleHovered] = useState(false);

  const renderGenres = (genre: Genres) => {
    const isActive = selectedGenre === genre.slug;
    return (
      <Flex
        key={genre.id}
        alignItems={"center"}
        cursor={"pointer"}
        gap={".5rem"}
        onClick={() => {
          setSortOrder("");
          setGenre(genre.slug, genre.name);
        }}
        bg={isActive ? (colorMode === "dark" ? "#fff" : "#000") : undefined}
        color={isActive ? (colorMode === "dark" ? "#000" : "#fff") : undefined}
        p={isActive ? ".3rem" : undefined}
        borderRadius={isActive ? ".5rem" : undefined}
      >
        <Box p={".3rem"} borderRadius={"20%"}>
          <Image
            src={genre.image_background}
            alt={genre.name}
            h={"1.2rem"}
            w={"1.5rem"}
            borderRadius={"20%"}
          />
        </Box>
        <Text>{genre.name}</Text>
      </Flex>
    );
  };

  const visibleGenres = genres?.slice(0, 4) ?? [];
  const hiddenGenres = genres?.slice(4) ?? [];

  const getToggleStyles = () => {
    if (isToggleHovered) {
      return colorMode === "dark"
        ? { bg: "#fff", fill: "#000" }
        : { bg: "#000", fill: "#fff" };
    }

    return colorMode === "dark"
      ? { bg: "#666", fill: "darkgray" }
      : { bg: "#ccc", fill: "darkgray" };
  };

  const toggleStyles = getToggleStyles();

  return (
    <>
      <Heading
        my={".5rem"}
        _hover={{ color: "darkgray" }}
        transitionProperty={"color"}
        transitionDuration={".2s"}
        cursor={"pointer"}
        fontSize={"2xl"}
        fontWeight={"bolder"}
      >
        Genres
      </Heading>
      {isLoading ? (
        <Stack gap={".5rem"} py={".5rem"}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} height="2rem" borderRadius="full" />
          ))}
        </Stack>
      ) : (
        <Flex flexDirection={"column"} gap={".5rem"} py={".5rem"}>
          {visibleGenres.map((genre) => renderGenres(genre))}
          <Collapsible.Root open={showAllGenres}>
            <Collapsible.Content>
              <Stack gap={".5rem"}>
                {hiddenGenres.map((genre) => renderGenres(genre))}
              </Stack>
            </Collapsible.Content>
          </Collapsible.Root>
          {hiddenGenres.length > 0 && (
            <Flex
              alignItems={"center"}
              cursor={"pointer"}
              gap={".5rem"}
              onMouseEnter={() => setIsToggleHovered(true)}
              onMouseLeave={() => setIsToggleHovered(false)}
              onClick={() => setShowAllGenres((prev) => !prev)}
            >
              <Box p={".3rem"} bg={toggleStyles.bg} borderRadius={"20%"}>
                {showAllGenres ? (
                  <FaAngleUp size={"1.2rem"} fill={toggleStyles.fill} />
                ) : (
                  <FaAngleDown size={"1.2rem"} fill={toggleStyles.fill} />
                )}
              </Box>
              <Text color={"darkgray"}>
                {showAllGenres ? "Hide" : `Show all (${hiddenGenres.length})`}
              </Text>
            </Flex>
          )}
        </Flex>
      )}
    </>
  );
};

export default GenreSection;
