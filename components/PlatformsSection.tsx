"use client";
import { Box, Collapsible, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
  FaAndroid,
} from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useColorMode } from "./ui/color-mode";
import { useState } from "react";

interface PlatformsSectionProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const PlatformsSection = ({
  activeItem,
  setActiveItem,
}: PlatformsSectionProps) => {
  const { colorMode } = useColorMode();
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);
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

  const platforms = [
    {
      key: "pc",
      Icon: FaWindows,
    },
    {
      key: "playstation",
      Icon: FaPlaystation,
    },
    {
      key: "xbox",
      Icon: FaXbox,
    },
    {
      key: "mac",
      Icon: FaApple,
    },
    {
      key: "android",
      Icon: FaAndroid,
    },
    {
      key: "nintendo",
      Icon: BsNintendoSwitch,
    },
  ];

  const renderPlatformItem = ({ key, Icon }: { key: string; Icon: any }) => {
    const styles = getItemStyles(key);

    return (
      <Flex
        key={key}
        alignItems={"center"}
        cursor={"pointer"}
        gap={".7rem"}
        onMouseEnter={() => setActiveItem(key)}
        onMouseLeave={() => setActiveItem("")}
      >
        <Box p={".3rem"} bg={styles.bg} borderRadius={"20%"}>
          <Icon size={"1.2rem"} fill={styles.fill} />
        </Box>
        <Text>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
      </Flex>
    );
  };

  const platformVisibleItems = platforms.slice(0, 3);
  const platformHiddenItems = platforms.slice(3);
  const toggleStyles = getToggleStyles();

  return (
    <Flex flexDirection={"column"} gap={".5rem"} py={".5rem"}>
      <Heading
        mt={".5rem"}
        _hover={{ color: "darkgray" }}
        transitionProperty={"color"}
        transitionDuration={".2s"}
        cursor={"pointer"}
        fontSize={"2xl"}
        fontWeight={"bolder"}
      >
        Platforms
      </Heading>
      {platformVisibleItems.map((item) => renderPlatformItem(item))}
      <Collapsible.Root open={showAllPlatforms}>
        <Collapsible.Content>
          <Stack gap={".5rem"}>
            {platformHiddenItems.map((item) => renderPlatformItem(item))}
          </Stack>
        </Collapsible.Content>
      </Collapsible.Root>
      {platformHiddenItems.length > 0 && (
        <Flex
          alignItems={"center"}
          cursor={"pointer"}
          gap={".7rem"}
          onMouseEnter={() => setIsToggleHovered(true)}
          onMouseLeave={() => setIsToggleHovered(false)}
          onClick={() => setShowAllPlatforms((prev) => !prev)}
        >
          <Box p={".3rem"} bg={toggleStyles.bg} borderRadius={"20%"}>
            {showAllPlatforms ? (
              <FaAngleUp size={"1.2rem"} fill={toggleStyles.fill} />
            ) : (
              <FaAngleDown size={"1.2rem"} fill={toggleStyles.fill} />
            )}
          </Box>
          <Text color={"darkgray"}>
            {showAllPlatforms ? "Hide" : "Show all"}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default PlatformsSection;
