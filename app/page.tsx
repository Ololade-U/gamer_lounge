"use client";
import { Heading, Input, InputGroup, Text } from "@chakra-ui/react";
import useGames from "./hooks/useGames";
import { LuSearch } from "react-icons/lu";
import { ColorModeButton, useColorMode } from "@/components/ui/color-mode";
import Header from "@/components/Header";
import GameGrid from "@/components/GameGrid";
import usePlatforms from "./hooks/usePlatforms";

export default function Home() {
  const { colorMode } = useColorMode();

  return (
    <main
      className={`grid grid-rows-[70px_1fr] grid-cols-[200px_1fr] gap-3 h-[100vh] w-[100%] bg-[#151515] ${colorMode === "dark" ? "bg-[#151515] text-white" : "bg-white text-black"}`}
    >
      <section className="col-span-2 w-[100%] flex gap-4 items-center justify-between px-4">
        <Header />
      </section>
      <nav className="bg-blue-500 text-white">Navigation</nav>
      <section className="overflow-y-auto p-4">
        <Heading fontSize={"6xl"} fontWeight={"bolder"} mb={"1.5rem"}>
          New and trending
        </Heading>
        <Text>Based on player counts and release date</Text>

        <ul>
          <GameGrid />
        </ul>
      </section>
    </main>
  );
}
