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
  FaSteam,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaGooglePlay,
  FaItchIo,
  FaGamepad,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa6";
import { SiEpicgames, SiGogdotcom } from "react-icons/si";
import { BsNintendoSwitch } from "react-icons/bs";
import { IconType } from "react-icons";
import { useColorMode } from "./ui/color-mode";
import { useState } from "react";
import useGameQueryStore from "./Store";
import useStores, { Stores } from "@/app/hooks/useStores";

interface StoresSectionProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const StoresSection = ({ activeItem, setActiveItem }: StoresSectionProps) => {
  const { colorMode } = useColorMode();
  const [showAllStores, setShowAllStores] = useState(false);
  const [isToggleHovered, setIsToggleHovered] = useState(false);

  const setStore = useGameQueryStore((s) => s.setStore);
  const setSortOrder = useGameQueryStore((s) => s.setSortOrder);
  const selectedStore = useGameQueryStore((s) => s.GameQuery.store);

  const getItemStyles = (item: string, itemId: string) => {
    const isActive = activeItem === item || selectedStore === itemId;

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

  const { data: stores, isLoading } = useStores();

  const iconMap: { [key: string]: IconType } = {
    steam: FaSteam,
    playstation: FaPlaystation,
    xbox: FaXbox,
    "epic-games": SiEpicgames,
    gog: SiGogdotcom,
    nintendo: BsNintendoSwitch,
    "app-store": FaApple,
    "google-play": FaGooglePlay,
    itch: FaItchIo,
    default: FaGamepad,
  };

  const getStoreIcon = (slug: string) => {
    const key = Object.keys(iconMap).find((candidate) =>
      slug.includes(candidate),
    );
    return iconMap[key ?? "default"];
  };

  const renderStoreItem = (store: Stores, index: number) => {
    const Icon = getStoreIcon(store.slug);
    const styles = getItemStyles(store.slug, String(store.id));

    return (
      <Flex
        key={`${store.id}-${index}`}
        alignItems={"center"}
        cursor={"pointer"}
        gap={".7rem"}
        onMouseEnter={() => setActiveItem(store.slug)}
        onMouseLeave={() => setActiveItem("")}
        onClick={() => {
          setSortOrder("-added");
          setStore(String(store.id), store.name);
        }}
      >
        <Box p={".3rem"} bg={styles.bg} borderRadius={"20%"}>
          <Icon size={"1.2rem"} fill={styles.fill} />
        </Box>
        <Text>{store.name}</Text>
      </Flex>
    );
  };

  const storeVisibleItems = stores?.slice(0, 3) ?? [];
  const storeHiddenItems = stores?.slice(3) ?? [];
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
        Stores
      </Heading>
      {isLoading ? (
        <Stack gap={".5rem"}>
          {Array.from({ length: 4 }).map((_, index) => (
            <HStack key={index} gap={".7rem"}>
              <Skeleton height="2rem" w={"20%"} />
              <Skeleton height="2rem" w={"70%"} />
            </HStack>
          ))}
        </Stack>
      ) : (
        <>
          {storeVisibleItems.map((item, index) =>
            renderStoreItem(item, index),
          )}
          <Collapsible.Root open={showAllStores}>
            <Collapsible.Content>
              <Stack gap={".5rem"}>
                {storeHiddenItems.map((item, index) =>
                  renderStoreItem(item, index),
                )}
              </Stack>
            </Collapsible.Content>
          </Collapsible.Root>
        </>
      )}
      {!isLoading && storeHiddenItems.length > 0 && (
        <Flex
          alignItems={"center"}
          cursor={"pointer"}
          gap={".7rem"}
          onMouseEnter={() => setIsToggleHovered(true)}
          onMouseLeave={() => setIsToggleHovered(false)}
          onClick={() => setShowAllStores((prev) => !prev)}
        >
          <Box p={".3rem"} bg={toggleStyles.bg} borderRadius={"20%"}>
            {showAllStores ? (
              <FaAngleUp size={"1.2rem"} fill={toggleStyles.fill} />
            ) : (
              <FaAngleDown size={"1.2rem"} fill={toggleStyles.fill} />
            )}
          </Box>
          <Text color={"darkgray"}>{showAllStores ? "Hide" : "Show all"}</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default StoresSection;
