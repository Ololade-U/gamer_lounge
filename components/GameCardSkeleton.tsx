import { Card, HStack, Skeleton, SkeletonText } from "@chakra-ui/react";

const GameCardSkeleton = () => {
  return (
    <Card.Root
      w={"full"}
      maxW={"sm"}
      mx={"auto"}
      borderRadius={".8rem"}
      bg={{ _dark: "#202020", _light: "#e3e3e3" }}
      overflow={"hidden"}
    >
      <Skeleton
        w={"full"}
        h={{ base: "200px", md: "190px" }}
        borderRadius={0}
      />
      <Card.Body p={"1rem .8rem"} gap={2}>
        <HStack justifyContent={"space-between"}>
          <Skeleton height="1rem" width="30%" />
          <Skeleton height="1.2rem" width="2.2rem" borderRadius="20%" />
        </HStack>
        <SkeletonText noOfLines={1} />
      </Card.Body>
    </Card.Root>
  );
};

export default GameCardSkeleton;
