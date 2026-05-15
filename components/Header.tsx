"use client";
import { Heading, Input, InputGroup, ClientOnly } from "@chakra-ui/react/";
import { LuSearch } from "react-icons/lu";
import { ColorModeButton } from "./ui/color-mode";
import { useRef } from "react";
import useGameQueryStore from "./Store";

const Header = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const setSearchParam = useGameQueryStore((s) => s.setSearchParam);
  return (
    <>
      <Heading fontWeight={"extrabold"} ml={"4rem"}>
        G A M R
      </Heading>
      <InputGroup
        onChange={(e) => {
          e.preventDefault();
          if (searchRef.current) {
            setSearchParam(searchRef.current.value);
          }
        }}
        w={"60%"}
        startElement={<LuSearch />}
      >
        <Input
          ref={searchRef}
          w={"100%"}
          borderRadius={"1rem"}
          placeholder="Search games..."
        />
      </InputGroup>
      <ClientOnly>
        <ColorModeButton />
      </ClientOnly>
    </>
  );
};

export default Header;
