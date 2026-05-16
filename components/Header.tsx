"use client";
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  ClientOnly,
  IconButton,
} from "@chakra-ui/react/";
import { LuSearch } from "react-icons/lu";
import { FaBars } from "react-icons/fa";
import { ColorModeButton } from "./ui/color-mode";
import { useRef } from "react";
import useGameQueryStore from "./Store";

interface HeaderProps {
  onNavOpen?: () => void;
}

const Header = ({ onNavOpen }: HeaderProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const setSearchParam = useGameQueryStore((s) => s.setSearchParam);
  return (
    <Flex
      alignItems="center"
      gap={{ base: "0.5rem", md: "1.5rem" }}
      flexWrap="nowrap"
      justifyContent="space-between"
      w="full"
      px={{ base: ".6rem", md: '2.5rem' }}
    >
      <Heading
        fontSize={{ base: "lg", md: "2xl" }}
        fontWeight={"extrabold"}
        flexShrink={0}
      >
        G A M R
      </Heading>
      <InputGroup
        onChange={(e) => {
          e.preventDefault();
          if (searchRef.current) {
            setSearchParam(searchRef.current.value);
          }
        }}
        flex="1 1 auto"
        minW={0}
        w={{ base: "calc(100% - 11rem)", md: "60%" }}
        startElement={<LuSearch />}
      >
        <Input
          ref={searchRef}
          w={"100%"}
          minW={0}
          borderRadius={"1rem"}
          placeholder="Search games..."
        />
      </InputGroup>
      <Flex gap="0.5rem" alignItems="center" flexShrink={0}>
        <IconButton
          aria-label="Open navigation"
          display={{ base: "flex", md: "none" }}
          onClick={onNavOpen}
          variant="outline"
          size="sm"
        >
          <FaBars />
        </IconButton>
        <ClientOnly>
          <ColorModeButton />
        </ClientOnly>
      </Flex>
    </Flex>
  );
};

export default Header;
