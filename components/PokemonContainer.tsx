import { Flex, Text } from "@chakra-ui/layout";
import { Pokemon } from "../types";
import { FunctionComponent } from "react";
import { Image } from "@chakra-ui/react";

const PokemonContainer: FunctionComponent<Pokemon> = ({ ...pokemon }) => {
  return (
    <>
      <Flex
        m="5px"
        bg="cadetblue"
        border="1px solid black"
        borderRadius="lg"
        flexDir="column"
        alignItems="center"
        minW="150px"
      >
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          border="1px"
          borderRadius="lg"
          w="max"
          mt="5px"
          bg="darksalmon"
          pl="15px"
          pr="15px"
        />
        <Text>{pokemon.name}</Text>
      </Flex>
    </>
  );
};
export default PokemonContainer;
