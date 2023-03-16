import { Flex, Text, Box, Center } from "@chakra-ui/layout";
import { Tournament, Pokemon } from "../types";
import { FunctionComponent } from "react";
import { Button } from "@chakra-ui/button";
import PokemonContainer from "./PokemonContainer";

type Props = {
  tournament: Tournament;
};

const copyPVP = async (copyText: string) => {
  await navigator.clipboard.writeText(copyText);
  alert("copied!");
};

const TournamentContainer: FunctionComponent<Props> = ({ tournament }) => {
  const copyArray = tournament.pokemon.map(
    (pokemon: Pokemon) =>
      pokemon.name +
      "," +
      pokemon.moves[0] +
      "," +
      pokemon.moves[1] +
      "," +
      pokemon.moves[2] +
      "\n"
  );

  return (
    <Box
      key={tournament.bout + tournament.league}
      w="fit-content"
      maxW="95%"
      m="auto"
      pt="5px"
      mt="10px"
      borderWidth="1px"
      bg="darkgrey"
      // backgroundImage={"/ultra-ball.jpg"}
      borderRadius="lg"
    >
      <Box w="fit-content" m="auto" textAlign="center" color="black">
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
            <PokemonContainer key={pokemon.name + (index + 1)} {...pokemon} />
          </>
        ))}
      </Flex>
      <Text align="center">{`Score:
        
         ${tournament.wins} -  ${tournament.losses}`}</Text>
      <Center>
        <Button
          background="gold"
          _hover={{
            background: "white",
            color: "black",
          }}
          color="black"
          onClick={() => copyPVP(copyArray.join(""))}
          mb="3"
        >
          Copy Team
        </Button>
      </Center>
    </Box>
  );
};
export default TournamentContainer;
