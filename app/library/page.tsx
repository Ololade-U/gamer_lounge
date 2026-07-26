"use client";
import { useState } from "react";
import {
  Button,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerPositioner,
  DrawerRoot,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import GameCard from "@/components/GameCard";
import useLibraryStore from "@/components/LibraryStore";

export default function LibraryPage() {
  const { colorMode } = useColorMode();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const library = useLibraryStore((s) => s.library);

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
        <Heading
          textAlign={{ mdDown: "center" }}
          fontSize={{ base: "4xl", md: "6xl" }}
          fontWeight={"bolder"}
          my={"1rem"}
        >
          My Library
        </Heading>
        {library.length === 0 ? (
          <Text color="gray.400" textAlign={{ mdDown: "center" }}>
            Your library is empty. Tap the library icon on any game card to
            add it here.
          </Text>
        ) : (
          <SimpleGrid
            columns={{ sm: 1, md: 2, lg: 3, xlTo2xl: 3 }}
            gap={"1rem"}
          >
            {library.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </SimpleGrid>
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
