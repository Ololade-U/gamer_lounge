import { Game } from "@/app/hooks/useGames";
import { Icon, HStack } from "@chakra-ui/react";
import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
  FaAndroid,
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { BsNintendoSwitch } from "react-icons/bs";
import { BsGlobe } from "react-icons/bs";
import { IconType } from "react-icons";
import { useColorMode } from "./ui/color-mode";

const RenderPlatform = ({ game }: { game: Game }) => {
  const { colorMode } = useColorMode();
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
  };

  const icons = game.platforms.map(({ platform }) => {
    const key = Object.keys(iconMap).find((k) => platform.slug.includes(k));
    return key ? iconMap[key] : null;
  });

  const uniqueIcons = Array.from(
    new Set(icons.filter((icon): icon is IconType => icon !== null)),
  );

  return (
    <>
      <HStack gap={1} alignItems={"center"}>
        {uniqueIcons.map((IconComponent, index) => (
          <Icon
            key={index} // Using index is safe here as the list is static after render
            as={IconComponent}
            color="gray.500"
            boxSize="15px"
            fill={colorMode === "dark" ? "white" : "black"}
          />
        ))}
      </HStack>
    </>
  );
};

export default RenderPlatform;
