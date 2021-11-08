import { Flex, Text, Box } from "@chakra-ui/layout";
import { Tournament, Pokemon } from "../types";
import { FunctionComponent } from "react";
import TeamBox from "./TeamBox";
import { useEffect } from "react";
import { Button } from "@chakra-ui/button";
import { HStack, VStack } from "@chakra-ui/react";

const TeamsContainer: FunctionComponent<Tournament> = ({ ...tournament }) => {
  return (
    <>
      <Box bg="grey">
        <VStack>
          <Text>{tournament.league}</Text>
          <Text>{tournament.bout}</Text>
        </VStack>

        {tournament.pokemon.map((pokemon: Pokemon, index: number) => (
          <>
            <Flex>
              <TeamBox key={index + 1} {...pokemon} />
            </Flex>
          </>
        ))}
      </Box>
    </>
  );
};
export default TeamsContainer;
