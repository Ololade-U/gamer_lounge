"use client";
import Link from "next/link";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { GiPresent } from "react-icons/gi";
import { useColorMode } from "./ui/color-mode";
import { MdOutlineFolderCopy } from "react-icons/md";
import { useState } from "react";
import useGameQueryStore from "./Store";
import BrowseSection from "./BrowseSection";
import PlatformsSection from "./PlatformsSection";
import StoresSection from "./StoresSection";
import GenreSection from "./GenreSection";
import DevelopersSection from "./DevelopersSection";
import useLibraryStore from "./LibraryStore";

const Nav = () => {
  const { colorMode } = useColorMode();
  const [activeItem, setActiveItem] = useState("");
  const setSortOrder = useGameQueryStore((s) => s.setSortOrder);
  const wishlistCount = useLibraryStore((s) => s.wishlist.length);
  const libraryCount = useLibraryStore((s) => s.library.length);

  const getItemStyles = (item: string) => {
    const isActive = activeItem === item;

    if (isActive) {
      return colorMode === "dark"
        ? { bg: "#fff", fill: "#000" }
        : { bg: "#000", fill: "#fff" };
    }

    return colorMode === "dark"
      ? { bg: "#232523", fill: "#fff" }
      : { bg: "#E3E3E3", fill: "#000" };
  };

  const wishlistStyles = getItemStyles("wishlist");
  const libraryStyles = getItemStyles("library");

  return (
    <>
      <Stack
        pl={{ base: "1rem", md: "2.5rem" }}
        h={"full"}
        minH={0}
        minW={0}
        overflowY={"auto"}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <Flex flexDirection={"column"} gap={".5rem"}>
          <Link href="/">
            <Heading
              mb={".5rem"}
              _hover={{ color: "darkgray" }}
              transitionProperty={"color"}
              transitionDuration={".2s"}
              cursor={"pointer"}
              fontSize={{ base: "lg", md: "2xl" }}
              fontWeight={"bolder"}
              onClick={() => setSortOrder("-added")}
            >
              Home
            </Heading>
          </Link>
          <Link href="/wishlist">
            <Flex
              alignItems={"center"}
              cursor={"pointer"}
              gap={".5rem"}
              onMouseEnter={() => setActiveItem("wishlist")}
              onMouseLeave={() => setActiveItem("")}
            >
              <Box p={".3rem"} bg={wishlistStyles.bg} borderRadius={"20%"}>
                <GiPresent size={"1rem"} fill={wishlistStyles.fill} />
              </Box>
              <Text fontSize={{ base: "sm", md: "md" }}>
                Wishlist{wishlistCount > 0 ? ` (${wishlistCount})` : ""}
              </Text>
            </Flex>
          </Link>
          <Link href="/library">
            <Flex
              alignItems={"center"}
              cursor={"pointer"}
              gap={".5rem"}
              onMouseEnter={() => setActiveItem("library")}
              onMouseLeave={() => setActiveItem("")}
            >
              <Box p={".3rem"} bg={libraryStyles.bg} borderRadius={"20%"}>
                <MdOutlineFolderCopy size={"1rem"} fill={libraryStyles.fill} />
              </Box>
              <Text fontSize={{ base: "sm", md: "md" }}>
                My library{libraryCount > 0 ? ` (${libraryCount})` : ""}
              </Text>
            </Flex>
          </Link>
          <Link href="/all-games">
            <Heading
              mt={".5rem"}
              _hover={{ color: "darkgray" }}
              transitionProperty={"color"}
              transitionDuration={".2s"}
              cursor={"pointer"}
              fontSize={{ base: "lg", md: "2xl" }}
              fontWeight={"bolder"}
            >
              All Games
            </Heading>
          </Link>
          <BrowseSection
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <Box id="browse-platforms">
            <PlatformsSection
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
          </Box>
          <Box id="browse-stores">
            <StoresSection
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
          </Box>
          <Box id="browse-genres">
            <GenreSection />
          </Box>
          <Box id="browse-developers">
            <DevelopersSection />
          </Box>
        </Flex>
      </Stack>
    </>
  );
};

export default Nav;
