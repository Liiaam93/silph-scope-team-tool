import { Flex, Text } from "@chakra-ui/layout";
import { Tournament, Pokemon } from "../types";
import { FunctionComponent } from "react";
import TeamBox from "./TeamBox";
import { useEffect } from "react";
import { Button } from "@chakra-ui/button";

const TeamsContainer: FunctionComponent<Tournament> = ({ ...tournament }) => {
  return (
    <>
      <Flex bg="grey">
        <Text>{tournament.league}</Text>
        <Text>{tournament.bout}</Text>
        {tournament.pokemon.map((pokemon: Pokemon, index: number) => (
          <>
            <TeamBox key={index + 1} {...pokemon} />
          </>
        ))}
      </Flex>
    </>
  );
};
export default TeamsContainer;
