"use client";
import {
  Heading,
  Text,
  Menu as Menus,
  Portal,
  Button,
  IconButton,
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
import { FaChevronDown, FaBars } from "react-icons/fa";
import useGameQueryStore from "@/components/Store";
import { useEffect, useState } from "react";
import Nav from "@/components/Nav";

export default function AllGamesPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { colorMode } = useColorMode();
  const sortValue = useGameQueryStore((s) => s.GameQuery.ordering);
  const setSortOrder = useGameQueryStore((s) => s.setSortOrder);
  const setPlatform = useGameQueryStore((s) => s.setPlatform);
  const setGenre = useGameQueryStore((s) => s.setGenre);
  const sortOrder = [
    { label: "Trending", value: "" },
    { label: "Relevance", value: "-rating" },
    { label: "Name", value: "name" },
    { label: "Release Date", value: "-released" },
    { label: "Metacritic", value: "-metacritic" },
    { label: "Updated", value: "-updated" },
  ];

  const [displaySortValue, setDisplaySortValue] = useState("Relevance");

  useEffect(() => {
    setDisplaySortValue(
      sortOrder.find((item) => item.value === sortValue)?.label || "Relevance",
    );
  }, [sortValue]);

  useEffect(() => {
    setSortOrder("");
    setPlatform("", "");
    setGenre("", "");
  }, [setSortOrder, setPlatform, setGenre]);

  return (
    <main
      className={`grid grid-rows-[70px_1fr] grid-cols-1 md:grid-cols-[220px_1fr] gap-3 h-screen w-full overflow-hidden ${
        colorMode === "dark" ? "bg-[#151515] text-white" : "bg-white text-black"
      }`}
    >
      <section className="md:col-span-2 w-full flex flex-wrap gap-3 items-center justify-between px-4">
        <Header onNavOpen={() => setDrawerOpen(true)} />
      </section>
      <nav className="hidden md:block min-h-0 min-w-0 overflow-hidden">
        <Nav />
      </nav>
      <section className="min-h-0 min-w-0 overflow-auto p-4 sm:p-2 [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Heading
          fontSize={{ base: "3xl", md: "6xl" }}
          fontWeight={"bolder"}
          my={{ base: "1rem", md: "1rem" }}
          textAlign={{mdDown : 'center'}}
        >
          All Games
        </Heading>
        <Menus.Root>
          <Menus.Trigger
            bg={{ _dark: "#262626", _light: "#E3E3E3" }}
            m={{ base: "1rem 0", md: "1.5rem .3rem" }}
            asChild
            ml={{base : '2rem', md: '0'}}
          >
            <Button
              p={{ base: "0.9rem 0.8rem", md: "1.2rem 1rem" }}
              variant="outline"
              size="sm"
              alignItems={"center"}
              fontSize={{ base: "sm", md: "md" }}
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
                      fontSize={{ base: "sm", md: "md" }}
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
