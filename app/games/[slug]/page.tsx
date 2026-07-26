"use client";
import { use, useState } from "react";
import Link from "next/link";
import {
  Badge,
  Box,
  Button,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerPositioner,
  DrawerRoot,
  Flex,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { FaArrowLeft, FaHeart, FaRegHeart } from "react-icons/fa6";
import { MdLibraryAdd, MdLibraryAddCheck } from "react-icons/md";
import { useColorMode } from "@/components/ui/color-mode";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import useGame from "@/app/hooks/useGame";
import useScreenshots from "@/app/hooks/useScreenshots";
import useTrailers from "@/app/hooks/useTrailers";
import useLibraryStore from "@/components/LibraryStore";
import RenderPlatform from "@/components/RenderPlatform";

const metacriticColor = (score?: number) => {
  if (!score) return "gray";
  if (score > 75) return "lightgreen";
  if (score > 50) return "yellow";
  return "red";
};

export default function GameDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { colorMode } = useColorMode();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: game, isLoading, error } = useGame(slug);
  const { data: screenshots } = useScreenshots(slug);
  const { data: trailers } = useTrailers(slug);

  const toggleWishlist = useLibraryStore((s) => s.toggleWishlist);
  const toggleLibrary = useLibraryStore((s) => s.toggleLibrary);
  const inWishlist = useLibraryStore((s) =>
    game ? s.isInWishlist(game.id) : false,
  );
  const inLibrary = useLibraryStore((s) =>
    game ? s.isInLibrary(game.id) : false,
  );

  const savedGame = game
    ? {
        id: game.id,
        slug: game.slug,
        name: game.name,
        background_image: game.background_image,
        rating: game.rating,
        metacritic: game.metacritic,
      }
    : null;

  return (
    <main
      className={`grid grid-rows-[70px_1fr] grid-cols-1 md:grid-cols-[220px_1fr] gap-3 h-screen w-full overflow-hidden ${colorMode === "dark" ? "bg-[#151515] text-white" : "bg-white text-black"}`}
    >
      <section
        className="md:col-span-2 w-full flex flex-wrap gap-3 items-center justify-between"
        style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
      >
        <Header onNavOpen={() => setDrawerOpen(true)} />
      </section>
      <nav className="hidden md:block min-h-0 min-w-0 overflow-hidden">
        <Nav />
      </nav>
      <section
        className="min-h-0 min-w-0 overflow-auto [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ padding: "1rem" }}
      >
        <Link href="/all-games">
          <HStack color="gray.400" mb={4} _hover={{ color: "gray.200" }}>
            <FaArrowLeft />
            <Text>Back to all games</Text>
          </HStack>
        </Link>

        {isLoading && (
          <Stack gap={4}>
            <Skeleton height="320px" borderRadius=".8rem" />
            <SkeletonText noOfLines={4} />
          </Stack>
        )}

        {!!error && <Text>Failed to load this game. Please try again.</Text>}

        {game && (
          <Stack gap={6} maxW="5xl" pb={10}>
            <Box position="relative">
              <Image
                src={game.background_image}
                alt={game.name}
                w="full"
                maxH="420px"
                objectFit="cover"
                borderRadius=".8rem"
              />
            </Box>

            <Flex
              justifyContent="space-between"
              alignItems={{ base: "flex-start", md: "center" }}
              flexDirection={{ base: "column", md: "row" }}
              gap={3}
            >
              <Heading
                fontSize={{ base: "3xl", md: "5xl" }}
                fontWeight="bolder"
                lineHeight={1.25}
              >
                {game.name}
              </Heading>
              <HStack gap={2}>
                <Button
                  variant="outline"
                  onClick={() => savedGame && toggleWishlist(savedGame)}
                >
                  {inWishlist ? (
                    <FaHeart color="#ff4d6d" />
                  ) : (
                    <FaRegHeart />
                  )}
                  {inWishlist ? "Wishlisted" : "Add to wishlist"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => savedGame && toggleLibrary(savedGame)}
                >
                  {inLibrary ? (
                    <MdLibraryAddCheck color="lightgreen" />
                  ) : (
                    <MdLibraryAdd />
                  )}
                  {inLibrary ? "In library" : "Add to library"}
                </Button>
              </HStack>
            </Flex>

            <HStack gap={4} flexWrap="wrap">
              <RenderPlatform platforms={game.platforms} />
              {!!game.metacritic && (
                <Text
                  border={`1.5px solid ${metacriticColor(game.metacritic)}`}
                  color={metacriticColor(game.metacritic)}
                  borderRadius="20%"
                  p=".1rem .6rem"
                  fontSize="sm"
                  fontWeight="bolder"
                >
                  {game.metacritic}
                </Text>
              )}
              <Text color="gray.400">
                {game.tba ? "TBA" : game.released ?? "Release date unknown"}
              </Text>
              {!!game.playtime && (
                <Text color="gray.400">~{game.playtime}h playtime</Text>
              )}
              {game.esrb_rating && (
                <Badge variant="outline">{game.esrb_rating.name}</Badge>
              )}
            </HStack>

            <Wrap gap={2}>
              {game.genres?.map((genre) => (
                <Badge key={genre.id} colorPalette="purple" variant="subtle">
                  {genre.name}
                </Badge>
              ))}
            </Wrap>

            {game.description_raw && (
              <Box>
                <Heading fontSize="2xl" mb={2}>
                  About
                </Heading>
                <Text color={{ _dark: "gray.300", _light: "gray.700" }} whiteSpace="pre-line">
                  {game.description_raw}
                </Text>
              </Box>
            )}

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
              {!!game.developers?.length && (
                <Box>
                  <Heading fontSize="lg" mb={1}>
                    Developers
                  </Heading>
                  <Text color="gray.400">
                    {game.developers.map((d) => d.name).join(", ")}
                  </Text>
                </Box>
              )}
              {!!game.publishers?.length && (
                <Box>
                  <Heading fontSize="lg" mb={1}>
                    Publishers
                  </Heading>
                  <Text color="gray.400">
                    {game.publishers.map((p) => p.name).join(", ")}
                  </Text>
                </Box>
              )}
            </SimpleGrid>

            {game.website && (
              <Box>
                <Link href={game.website} target="_blank">
                  <Button variant="outline" size="sm">
                    Visit official website
                  </Button>
                </Link>
              </Box>
            )}

            {!!trailers?.length && (
              <Box>
                <Heading fontSize="2xl" mb={2}>
                  Trailer
                </Heading>
                <video
                  controls
                  poster={trailers[0].preview}
                  style={{ width: "100%", borderRadius: ".8rem" }}
                >
                  <source src={trailers[0].data.max} />
                </video>
              </Box>
            )}

            {!!screenshots?.length && (
              <Box>
                <Heading fontSize="2xl" mb={2}>
                  Screenshots
                </Heading>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={3}>
                  {screenshots.map((shot) => (
                    <Image
                      key={shot.id}
                      src={shot.image}
                      alt={game.name}
                      borderRadius=".6rem"
                      objectFit="cover"
                      h="160px"
                      w="full"
                    />
                  ))}
                </SimpleGrid>
              </Box>
            )}
          </Stack>
        )}
      </section>
      <DrawerRoot
        open={drawerOpen}
        onOpenChange={(details) => setDrawerOpen(details.open)}
      >
        <DrawerPositioner justifyContent="flex-end">
          <DrawerContent w={{ base: "80vw", md: "28rem" }} maxW="100%">
            <DrawerCloseTrigger asChild>
              <Button size="sm" variant="ghost" ml={2}>
                Close
              </Button>
            </DrawerCloseTrigger>
            <DrawerHeader fontSize={{ base: "lg", md: "2xl" }} px={4} py={4}>
              Menu
            </DrawerHeader>
            <DrawerBody px={0} py={4}>
              <Nav />
            </DrawerBody>
          </DrawerContent>
        </DrawerPositioner>
      </DrawerRoot>
    </main>
  );
}
