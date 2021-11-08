import { Flex, Text, VStack } from "@chakra-ui/layout";
import { Pokemon } from "../types";
import { FunctionComponent } from "react";
import { Image } from "@chakra-ui/react";

const TeamBox: FunctionComponent<Pokemon> = ({ ...pokemon }) => {
  return (
    <>
      <VStack>
        <Image src={pokemon.image} alt={pokemon.name} />
        <Text>{pokemon.name}</Text>
      </VStack>
    </>
  );
};
export default TeamBox;
