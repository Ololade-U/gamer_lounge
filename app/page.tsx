"use client";
import {
  Heading,
  Text,
  Menu as Menus,
  Portal,
  Button,
  DrawerRoot,
  DrawerPositioner,
  DrawerContent,
  DrawerCloseTrigger,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";
import Header from "@/components/Header";
import GameGrid from "@/components/GameGrid";
import { FaChevronDown } from "react-icons/fa";
import useGameQueryStore from "@/components/Store";
import { useEffect, useState } from "react";
import Nav from "@/components/Nav";

export default function Home() {
  const { colorMode } = useColorMode();
  const sortValue = useGameQueryStore((s) => s.GameQuery.ordering);
  const platformLabel = useGameQueryStore((s) => s.GameQuery.platformLabel);
  const genreLabel = useGameQueryStore((s) => s.GameQuery.genreLabel);
  const storeLabel = useGameQueryStore((s) => s.GameQuery.storeLabel);
  const developerLabel = useGameQueryStore((s) => s.GameQuery.developerLabel);
  const setSortOrder = useGameQueryStore((s) => s.setSortOrder);
  const activeFilterLabel =
    genreLabel || platformLabel || storeLabel || developerLabel;
  const sortOrder = [
    { label: "Trending", value: "-added" },
    { label: "Relevance", value: "-rating" },
    { label: "Name", value: "name" },
    { label: "Release Date", value: "-released" },
    { label: "Metacritic", value: "-metacritic" },
    { label: "Updated", value: "-updated" },
  ];

  const [displaySortValue, setDisplaySortValue] = useState("Trending");

  useEffect(() => {
    setDisplaySortValue(
      sortOrder.find((item) => item.value === sortValue)?.label || "Trending",
    );
  }, [sortValue]);

  const [drawerOpen, setDrawerOpen] = useState(false);

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
        style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
      >
        <Heading
          textAlign={{ mdDown: "center" }}
          fontSize={{ base: "4xl", md: "6xl" }}
          fontWeight={"bolder"}
          my={"1rem"}
        >
          {activeFilterLabel ? `${activeFilterLabel} games` : "All Games"}
        </Heading>
        {!activeFilterLabel && (
          <Text textAlign={{ mdDown: "center" }}>
            The most popular games right now
          </Text>
        )}
        <Menus.Root>
          <Menus.Trigger
            bg={{ _dark: "#262626", _light: "#E3E3E3" }}
            m={"1.5rem .3rem"}
            asChild
            ml={{ base: ".6rem", md: "0" }}
          >
            <Button
              p={"1.2rem 1rem"}
              variant="outline"
              size="sm"
              alignItems={"center"}
            >
              Order by: <Text fontWeight={"bold"}> {displaySortValue} </Text>{" "}
              <FaChevronDown />
            </Button>
          </Menus.Trigger>
          <Portal>
            <Menus.Positioner>
              <Menus.Content
                borderRadius={".3rem"}
                minW="12rem"
                pos={"relative"}
                bg={"white"}
              >
                <Menus.RadioItemGroup
                  value={sortValue}
                  onValueChange={(e) => setSortOrder(e.value)}
                >
                  {sortOrder.map((item) => (
                    <Menus.RadioItem
                      fontSize={"md"}
                      color={"black"}
                      p={".3rem .5rem .3rem 1.3rem"}
                      pos={"relative"}
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                      <Menus.ItemIndicator left={"0"} pos={"absolute"} />
                    </Menus.RadioItem>
                  ))}
                </Menus.RadioItemGroup>
              </Menus.Content>
            </Menus.Positioner>
          </Portal>
        </Menus.Root>
        <ul>
          <GameGrid />
        </ul>
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
