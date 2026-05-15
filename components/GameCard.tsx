import { Game } from "@/app/hooks/useGames";
import { Card, Heading, Image } from "@chakra-ui/react";
import RenderPlatform from "./RenderPlatform";

const GameCard = ({ game }: { game: Game }) => {
  return (
    <Card.Root
      maxW={"sm"}
      borderRadius={".8rem"}
      bg={{ _dark: "#202020", _light: "#e3e3e3" }}
    >
      <Image
        borderRadius={".8rem .8rem 0 0"}
        src={game.background_image}
        alt={game.name}
        h={"190px"}
      />
      <Card.Body p={"1rem .8rem"} gap={2}>
        <RenderPlatform game={game} />
        <Heading fontSize={'2xl'}>
          {game.name}
          {game.metacritic > 80
            ? " 🎯"
            : game.metacritic > 60
              ? " 👍"
              : game.metacritic > 50
                ? " ⛔"
                : " 😑"}
        </Heading>
      </Card.Body>
    </Card.Root>
  );
};

export default GameCard;
