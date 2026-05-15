import { useState } from "react";
import { Game } from "@/app/hooks/useGames";
import { Box, Card, Heading, HStack, Image, Text } from "@chakra-ui/react";
import RenderPlatform from "./RenderPlatform";

const GameCard = ({ game }: { game: Game }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card.Root
      maxW={"sm"}
      borderRadius={".8rem"}
      bg={{ _dark: "#202020", _light: "#e3e3e3" }}
      overflow={"visible"}
      position={"relative"}
      transition={"transform .2s ease"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "lg",
      }}
    >
      <Image
        borderRadius={".8rem .8rem 0 0"}
        src={game.background_image}
        alt={game.name}
        h={"190px"}
      />
      <Card.Body p={"1rem .8rem"} gap={2}>
        <HStack justifyContent={"space-between"}>
          <RenderPlatform game={game} />
          <Text
            border={game.metacritic &&
              (game.metacritic > 75
                ? "1.5px solid lightgreen"
                : game.metacritic > 50
                  ? "1.5px solid yellow"
                  : "1.5px solid red")
            }
            color={
              game.metacritic > 75
                ? "lightgreen"
                : game.metacritic > 50
                  ? "yellow"
                  : "red"
            }
            borderRadius={"20%"}
            p={".1rem .5rem"}
            fontSize={"12px"}
            fontWeight={"bolder"}
          >
            {game.metacritic}
          </Text>
        </HStack>
        <Heading fontSize={"2xl"}>
          {game.name}
          {game.rating > 4
            ? " 🎯"
            : game.rating > 3
              ? " 👍"
              : game.rating > 2.5
                ? " ⛔"
                : " 😑"}
        </Heading>
      </Card.Body>
      <Box
        position={"absolute"}
        left={0}
        right={0}
        bottom={0}
        zIndex={2}
        maxH={isHovered ? "120px" : 0}
        opacity={isHovered ? 1 : 0}
        overflow={"hidden"}
        transition={"max-height .2s ease, opacity .2s ease, padding .2s ease"}
        px={"1rem"}
        py={isHovered ? "1rem" : 0}
        bg={{ _dark: "#181818", _light: "#f7f7f7" }}
        borderRadius={"0 0 .8rem .8rem"}
        transform={isHovered ? "translateY(0)" : "translateY(100%)"}
      >
        <HStack justifyContent={"space-between"} gap={4}>
          <Box>
            <Text fontSize={"sm"} color={"gray.500"}>
              Release
            </Text>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {game.released ?? "TBA"}
            </Text>
          </Box>
          <Box>
            <Text fontSize={"sm"} color={"gray.500"}>
              Genre
            </Text>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {game.genres
                ?.slice(0, 2)
                .map((genre) => genre.name)
                .join(", ") || "Unknown"}
            </Text>
          </Box>
        </HStack>
      </Box>
    </Card.Root>
  );
};

export default GameCard;
