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
import GenreSection from "./GenreSection";

const Nav = () => {
  const { colorMode } = useColorMode();
  const [activeItem, setActiveItem] = useState("");
  const setSortOrder = useGameQueryStore((s) => s.setSortOrder);

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
        pl={"2.5rem"}
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
              fontSize={"2xl"}
              fontWeight={"bolder"}
              onClick={() => setSortOrder("-rating")}
            >
              Home
            </Heading>
          </Link>
          <Flex
            alignItems={"center"}
            cursor={"pointer"}
            gap={".5rem"}
            onMouseEnter={() => setActiveItem("wishlist")}
            onMouseLeave={() => setActiveItem("")}
          >
            <Box p={".3rem"} bg={wishlistStyles.bg} borderRadius={"20%"}>
              <GiPresent size={"1.2rem"} fill={wishlistStyles.fill} />
            </Box>
            <Text>Wishlist</Text>
          </Flex>
          <Flex
            alignItems={"center"}
            cursor={"pointer"}
            gap={".5rem"}
            onMouseEnter={() => setActiveItem("library")}
            onMouseLeave={() => setActiveItem("")}
          >
            <Box p={".3rem"} bg={libraryStyles.bg} borderRadius={"20%"}>
              <MdOutlineFolderCopy size={"1.2rem"} fill={libraryStyles.fill} />
            </Box>
            <Text>My library</Text>
          </Flex>
          <Link href="/all-games">
            <Heading
              mt={".5rem"}
              _hover={{ color: "darkgray" }}
              transitionProperty={"color"}
              transitionDuration={".2s"}
              cursor={"pointer"}
              fontSize={"2xl"}
              fontWeight={"bolder"}
            >
              All Games
            </Heading>
          </Link>
          <BrowseSection
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <PlatformsSection
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <GenreSection />
        </Flex>
      </Stack>
    </>
  );
};

export default Nav;
