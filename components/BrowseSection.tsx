"use client";
import { Box, Collapsible, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { IoGameController } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import { FaGhost } from "react-icons/fa6";
import { RiFolderOpenFill } from "react-icons/ri";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useColorMode } from "./ui/color-mode";
import { useState } from "react";
import { IoCodeSlash } from "react-icons/io5";

interface BrowseSectionProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const BrowseSection = ({ activeItem, setActiveItem }: BrowseSectionProps) => {
  const { colorMode } = useColorMode();
  const [showAllBrowse, setShowAllBrowse] = useState(false);
  const [isToggleHovered, setIsToggleHovered] = useState(false);

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

  const getToggleStyles = () => {
    if (isToggleHovered) {
      return colorMode === "dark"
        ? { bg: "#fff", fill: "#000" }
        : { bg: "#000", fill: "#fff" };
    }

    return colorMode === "dark"
      ? { bg: "#666", fill: "darkgray" }
      : { bg: "#ccc", fill: "darkgray" };
  };

  const browseItems = [
    {
      key: "platforms",
      label: "Platforms",
      Icon: IoGameController,
    },
    {
      key: "stores",
      label: "Stores",
      Icon: IoMdDownload,
    },
    {
      key: "collections",
      label: "Collections",
      Icon: RiFolderOpenFill,
    },
    {
      key: "genres",
      label: "Genres",
      Icon: FaGhost,
    },
    {
      key: "developers",
      label: "Developers",
      Icon: IoCodeSlash,
    },
  ];

  const renderBrowseItem = ({
    key,
    label,
    Icon,
  }: {
    key: string;
    label: string;
    Icon: any;
  }) => {
    const styles = getItemStyles(key);

    return (
      <Flex
        key={key}
        alignItems={"center"}
        cursor={"pointer"}
        gap={".5rem"}
        onMouseEnter={() => setActiveItem(key)}
        onMouseLeave={() => setActiveItem("")}
      >
        <Box p={".3rem"} bg={styles.bg} borderRadius={"20%"}>
          <Icon size={"1.2rem"} fill={styles.fill} />
        </Box>
        <Text>{label}</Text>
      </Flex>
    );
  };

  const browseVisibleItems = browseItems.slice(0, 3);
  const browseHiddenItems = browseItems.slice(3);
  const toggleStyles = getToggleStyles();

  return (
    <Flex flexDirection={"column"} gap={".5rem"}>
      <Heading
        my={".5rem"}
        _hover={{ color: "darkgray" }}
        transitionProperty={"color"}
        transitionDuration={".2s"}
        cursor={"pointer"}
        fontSize={"2xl"}
        fontWeight={"bolder"}
      >
        Browse
      </Heading>
      {browseVisibleItems.map((item) => renderBrowseItem(item))}
      <Collapsible.Root open={showAllBrowse}>
        <Collapsible.Content>
          <Stack gap={".5rem"}>
            {browseHiddenItems.map((item) => renderBrowseItem(item))}
          </Stack>
        </Collapsible.Content>
      </Collapsible.Root>
      {browseHiddenItems.length > 0 && (
        <Flex
          alignItems={"center"}
          cursor={"pointer"}
          gap={".5rem"}
          onMouseEnter={() => setIsToggleHovered(true)}
          onMouseLeave={() => setIsToggleHovered(false)}
          onClick={() => setShowAllBrowse((prev) => !prev)}
        >
          <Box p={".3rem"} bg={toggleStyles.bg} borderRadius={"20%"}>
            {showAllBrowse ? (
              <FaAngleUp size={"1.2rem"} fill={toggleStyles.fill} />
            ) : (
              <FaAngleDown size={"1.2rem"} fill={toggleStyles.fill} />
            )}
          </Box>
          <Text color={"darkgray"}>{showAllBrowse ? "Hide" : "Show all"}</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default BrowseSection;
