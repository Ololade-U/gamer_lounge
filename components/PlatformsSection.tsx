"use client";
import {
  Box,
  Collapsible,
  Flex,
  Heading,
  HStack,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
  FaAndroid,
  FaGamepad,
} from "react-icons/fa";
import { BsNintendoSwitch, BsGlobe } from "react-icons/bs";
import { MdPhoneIphone } from "react-icons/md";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { IconType } from "react-icons";
import { useColorMode } from "./ui/color-mode";
import { useState } from "react";
import useGameQueryStore from "./Store";
import usePlatforms, { Platforms } from "@/app/hooks/usePlatforms";

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

  const setPlatform = useGameQueryStore((s) => s.setPlatform);
  const setSortOrder = useGameQueryStore((s) => s.setSortOrder);
  const selectedPlatform = useGameQueryStore((s) => s.GameQuery.platform);

  const getItemStyles = (item: string, itemId: string) => {
    const isActive = activeItem === item || selectedPlatform === itemId;

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

  const { data: platforms, isLoading } = usePlatforms();

  const iconMap: { [key: string]: IconType } = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    nintendo: BsNintendoSwitch,
    mac: FaApple,
    linux: FaLinux,
    android: FaAndroid,
    ios: MdPhoneIphone,
    web: BsGlobe,
    default: FaGamepad,
  };

  const getPlatformIcon = (slug: string) => {
    const key = Object.keys(iconMap).find((candidate) =>
      slug.includes(candidate),
    );
    return iconMap[key ?? "default"];
  };

  const renderPlatformItem = (platform: Platforms, index: number) => {
    const Icon = getPlatformIcon(platform.slug);
    const styles = getItemStyles(platform.slug, String(platform.id));

    return (
      <Flex
        key={`${platform.id}-${index}`}
        alignItems={"center"}
        cursor={"pointer"}
        gap={".7rem"}
        onMouseEnter={() => setActiveItem(platform.slug)}
        onMouseLeave={() => setActiveItem("")}
        onClick={() => {
          setSortOrder("");
          setPlatform(String(platform.id), platform.name);
        }}
      >
        <Box p={".3rem"} bg={styles.bg} borderRadius={"20%"}>
          <Icon size={"1.2rem"} fill={styles.fill} />
        </Box>
        <Text>{platform.name}</Text>
      </Flex>
    );
  };

  const platformVisibleItems = platforms?.slice(0, 3) ?? [];
  const platformHiddenItems = platforms?.slice(3) ?? [];
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
      {isLoading ? (
        <Stack gap={".5rem"}>
          {Array.from({ length: 4 }).map((_, index) => (
            <>
              <HStack key={index} gap={".7rem"}>
                <Skeleton height="2rem" w={"20%"} />
                <Skeleton height="2rem" w={"70%"} />
              </HStack>
            </>
          ))}
        </Stack>
      ) : (
        <>
          {platformVisibleItems.map((item, index) =>
            renderPlatformItem(item, index),
          )}
          <Collapsible.Root open={showAllPlatforms}>
            <Collapsible.Content>
              <Stack gap={".5rem"}>
                {platformHiddenItems.map((item, index) =>
                  renderPlatformItem(item, index),
                )}
              </Stack>
            </Collapsible.Content>
          </Collapsible.Root>
        </>
      )}
      {!isLoading && platformHiddenItems.length > 0 && (
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
