"use client";
import {
  Box,
  Collapsible,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { MdBusiness } from "react-icons/md";
import { useState } from "react";
import { useColorMode } from "./ui/color-mode";
import useDevelopers, { Developers } from "@/app/hooks/useDevelopers";
import useGameQueryStore from "./Store";

const DevelopersSection = () => {
  const { colorMode } = useColorMode();
  const { data: developers, isLoading } = useDevelopers();
  const selectedDeveloper = useGameQueryStore((s) => s.GameQuery.developers);
  const setDeveloper = useGameQueryStore((s) => s.setDeveloper);
  const setSortOrder = useGameQueryStore((s) => s.setSortOrder);
  const [showAllDevelopers, setShowAllDevelopers] = useState(false);
  const [isToggleHovered, setIsToggleHovered] = useState(false);

  const renderDeveloper = (developer: Developers) => {
    const isActive = selectedDeveloper === String(developer.id);
    return (
      <Flex
        key={developer.id}
        alignItems={"center"}
        cursor={"pointer"}
        gap={".5rem"}
        onClick={() => {
          setSortOrder("-added");
          setDeveloper(String(developer.id), developer.name);
        }}
        bg={isActive ? (colorMode === "dark" ? "#fff" : "#000") : undefined}
        color={isActive ? (colorMode === "dark" ? "#000" : "#fff") : undefined}
        p={isActive ? ".3rem" : undefined}
        borderRadius={isActive ? ".5rem" : undefined}
      >
        <Box p={".3rem"} borderRadius={"20%"}>
          <MdBusiness size={"1.2rem"} />
        </Box>
        <Text>{developer.name}</Text>
      </Flex>
    );
  };

  const visibleDevelopers = developers?.slice(0, 4) ?? [];
  const hiddenDevelopers = developers?.slice(4) ?? [];

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

  const toggleStyles = getToggleStyles();

  return (
    <>
      <Heading
        my={".5rem"}
        _hover={{ color: "darkgray" }}
        transitionProperty={"color"}
        transitionDuration={".2s"}
        cursor={"pointer"}
        fontSize={"2xl"}
        fontWeight={"bolder"}
      >
        Developers
      </Heading>
      {isLoading ? (
        <Stack gap={".5rem"} py={".5rem"}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} height="2rem" borderRadius="full" />
          ))}
        </Stack>
      ) : (
        <Flex flexDirection={"column"} gap={".5rem"} py={".5rem"}>
          {visibleDevelopers.map((developer) => renderDeveloper(developer))}
          <Collapsible.Root open={showAllDevelopers}>
            <Collapsible.Content>
              <Stack gap={".5rem"}>
                {hiddenDevelopers.map((developer) =>
                  renderDeveloper(developer),
                )}
              </Stack>
            </Collapsible.Content>
          </Collapsible.Root>
          {hiddenDevelopers.length > 0 && (
            <Flex
              alignItems={"center"}
              cursor={"pointer"}
              gap={".5rem"}
              onMouseEnter={() => setIsToggleHovered(true)}
              onMouseLeave={() => setIsToggleHovered(false)}
              onClick={() => setShowAllDevelopers((prev) => !prev)}
            >
              <Box p={".3rem"} bg={toggleStyles.bg} borderRadius={"20%"}>
                {showAllDevelopers ? (
                  <FaAngleUp size={"1.2rem"} fill={toggleStyles.fill} />
                ) : (
                  <FaAngleDown size={"1.2rem"} fill={toggleStyles.fill} />
                )}
              </Box>
              <Text color={"darkgray"}>
                {showAllDevelopers
                  ? "Hide"
                  : `Show all (${hiddenDevelopers.length})`}
              </Text>
            </Flex>
          )}
        </Flex>
      )}
    </>
  );
};

export default DevelopersSection;
