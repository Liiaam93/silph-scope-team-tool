import { Flex, Text, Box } from "@chakra-ui/layout";
import { Tournament, Pokemon } from "../types";
import { FunctionComponent } from "react";
import TeamBox from "./TeamBox";

const TeamsContainer: FunctionComponent<Tournament> = ({ ...tournament }) => {
  return (
    <>
      <Box
        w="80%"
        m="auto"
        pt="5px"
        mt="10px"
        borderWidth="1px"
        bg="darkgrey"
        borderRadius="lg"
      >
        <Box w="fit-content" m="auto" textAlign="center">
          <Text>{tournament.league}</Text>
          <Text>{tournament.bout}</Text>
        </Box>
        <Flex wrap="wrap" w="auto" m="auto" justify="center">
          {tournament.pokemon.map((pokemon: Pokemon, index: number) => (
            <>
              <TeamBox key={index + 1} {...pokemon} />
            </>
          ))}
        </Flex>
      </Box>
    </>
  );
};
export default TeamsContainer;
