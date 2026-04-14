"use client";
import { Heading, Input, InputGroup, ClientOnly } from "@chakra-ui/react/";
import { LuSearch } from "react-icons/lu";
import { ColorModeButton } from "./ui/color-mode";

const Header = () => {
  return (
    <>
      <Heading fontWeight={"extrabold"} ml={"4rem"}>
        R A W G
      </Heading>
      <InputGroup w={"60%"} startElement={<LuSearch />}>
        <Input w={"100%"} borderRadius={"1rem"} placeholder="Search games..." />
      </InputGroup>
      <ClientOnly>
        <ColorModeButton />
      </ClientOnly>
    </>
  );
};

export default Header;
