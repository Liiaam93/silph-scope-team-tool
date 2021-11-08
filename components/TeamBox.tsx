import { Flex, Text } from "@chakra-ui/layout";
import { Pokemon } from "../types";
import { FunctionComponent } from "react";
import { Image } from "@chakra-ui/react";

const TeamBox: FunctionComponent<Pokemon> = ({ ...pokemon }) => {
  return (
    <>
      <Flex>
        <Image src={pokemon.image} alt={pokemon.name} />
        <Text>{pokemon.name}</Text>
      </Flex>
    </>
  );
};
export default TeamBox;
