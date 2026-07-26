import { useState } from "react";
import Link from "next/link";
import { Game } from "@/app/hooks/useGames";
import {
  Box,
  Card,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { MdLibraryAdd, MdLibraryAddCheck } from "react-icons/md";
import RenderPlatform from "./RenderPlatform";
import useLibraryStore from "./LibraryStore";

const GameCard = ({ game }: { game: Game }) => {
  const [isHovered, setIsHovered] = useState(false);
  const toggleWishlist = useLibraryStore((s) => s.toggleWishlist);
  const toggleLibrary = useLibraryStore((s) => s.toggleLibrary);
  const inWishlist = useLibraryStore((s) => s.isInWishlist(game.id));
  const inLibrary = useLibraryStore((s) => s.isInLibrary(game.id));

  const savedGame = {
    id: game.id,
    slug: game.slug,
    name: game.name,
    background_image: game.background_image,
    rating: game.rating,
    metacritic: game.metacritic,
  };

  return (
    <Link href={`/games/${game.slug}`} style={{ display: "block" }}>
      <Card.Root
        w={"full"}
        maxW={"sm"}
        mx={"auto"}
        borderRadius={".8rem"}
        bg={{ _dark: "#202020", _light: "#e3e3e3" }}
        overflow={"visible"}
        position={"relative"}
        transition={"transform .2s ease"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          if (typeof window !== "undefined" && window.matchMedia) {
            // only toggle on devices that don't support hover (touch/mobile)
            if (window.matchMedia("(hover: none)").matches) {
              setIsHovered((s) => !s);
            }
          }
        }}
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
        }}
      >
        <Box position={"relative"}>
          <Image
            borderRadius={".8rem .8rem 0 0"}
            src={game.background_image}
            alt={game.name}
            h={{ base: "200px", md: "190px" }}
            w={"full"}
          />
          <HStack position={"absolute"} top={2} right={2} gap={1}>
            <IconButton
              aria-label={
                inWishlist ? "Remove from wishlist" : "Add to wishlist"
              }
              size="sm"
              borderRadius={"full"}
              bg={"blackAlpha.700"}
              _hover={{ bg: "blackAlpha.800" }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(savedGame);
              }}
            >
              {inWishlist ? (
                <FaHeart color="#ff4d6d" />
              ) : (
                <FaRegHeart color="white" />
              )}
            </IconButton>
            <IconButton
              aria-label={
                inLibrary ? "Remove from library" : "Add to library"
              }
              size="sm"
              borderRadius={"full"}
              bg={"blackAlpha.700"}
              _hover={{ bg: "blackAlpha.800" }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleLibrary(savedGame);
              }}
            >
              {inLibrary ? (
                <MdLibraryAddCheck color="lightgreen" />
              ) : (
                <MdLibraryAdd color="white" />
              )}
            </IconButton>
          </HStack>
        </Box>
        <Card.Body p={"1rem .8rem"} gap={2}>
          <HStack justifyContent={"space-between"}>
            <RenderPlatform platforms={game.platforms} />
            <Text
              border={
                game.metacritic &&
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
          <Text
            display={{ base: "block", md: "none" }}
            mt={2}
            textAlign={"center"}
            textDecoration={"underline"}
            textDecorationColor={"#d3d3d3"}
            fontSize={"sm"}
            cursor={"pointer"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsHovered((s) => !s);
            }}
          >
            {isHovered ? "View less" : "View more"}
          </Text>
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
    </Link>
  );
};

export default GameCard;
