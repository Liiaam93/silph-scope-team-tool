import { Flex, Text, Box } from "@chakra-ui/layout";
import { Tournament, Pokemon } from "../types";
import { FunctionComponent, useEffect, useState } from "react";
import PokemonContainer from "./PokemonContainer";
import { getMoveData } from "../pages/utils/api/pvpoke";

type Props = {
  tournament: Tournament;
  leagueFilter: string;
};

const TeamsContainer: FunctionComponent<Props> = ({
  leagueFilter,
  tournament,
}) => {
  return (
    <>
      <Box
        w="fit-content"
        maxW="95%"
        m="auto"
        pt="5px"
        mt="10px"
        borderWidth="1px"
        bg="darkgrey"
        borderRadius="lg"
      >
        <Box w="fit-content" m="auto" textAlign="center">
          <Text fontSize="xl">{tournament.league}</Text>
          <Text>{tournament.bout}</Text>
        </Box>
        <Flex
          key={tournament.bout}
          wrap="wrap"
          w="auto"
          m="auto"
          justify="center"
        >
          {tournament.pokemon.map((pokemon: Pokemon, index: number) => (
            <>
              <PokemonContainer key={index + 1} {...pokemon} />
            </>
          ))}
        </Flex>
        <Text align="center">{`Score:
        
         ${tournament.wins} -  ${tournament.losses}`}</Text>
      </Box>
    </>
  );
};
export default TeamsContainer;
