"use client";
import { Heading, Text, Menu as Menus, Portal, Button } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";
import Header from "@/components/Header";
import GameGrid from "@/components/GameGrid";
import { FaChevronDown } from "react-icons/fa";
import useGameQueryStore from "@/components/Store";
import { useEffect, useState } from "react";

export default function Home() {
  const { colorMode } = useColorMode();
  const sortValue = useGameQueryStore((s) => s.GameQuery.ordering);
  const setSortOrder = useGameQueryStore((s) => s.setSortOrder);
  const sortOrder = [
    { label: "Relevance", value: "-rating" },
    { label: "Name", value: "name" },
    { label: "Release Date", value: "-added" },
    { label: "Metacritic", value: "metacritic" },
  ];

  const [displaySortValue, setDisplaySortValue] = useState("Relevance");

  useEffect(() => {
    setDisplaySortValue(
      sortOrder.find((item) => item.value === sortValue)?.label || "Relevance",
    );
  }, [sortValue]);

  return (
    <main
      className={`grid grid-rows-[70px_1fr] grid-cols-[270px_1fr] gap-3 h-[100vh] w-[100%] bg-[#151515] ${colorMode === "dark" ? "bg-[#151515] text-white" : "bg-white text-black"}`}
    >
      <section className="col-span-2 w-[100%] flex gap-4 items-center justify-between px-4">
        <Header />
      </section>
      <nav className="bg-blue-500 text-white">Navigation</nav>
      <section className="overflow-y-auto p-4">
        <Heading fontSize={"6xl"} fontWeight={"bolder"} mb={"1rem"}>
          New and trending
        </Heading>
        <Text>Based on player counts and release date</Text>
        <Menus.Root>
          <Menus.Trigger bg={"#262626"} m={"1.5rem .3rem"} asChild>
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
    </main>
  );
}
