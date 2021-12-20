import { Flex, Text, Box, Center } from "@chakra-ui/layout";
import { Tournament, Pokemon } from "../types";
import { FunctionComponent, useEffect, useState } from "react";
import { Button } from "@chakra-ui/button";
import PokemonContainer from "./PokemonContainer";
import { Image, useClipboard } from "@chakra-ui/react";
import { atom, useRecoilState } from "recoil";
import { leagueFilterState } from ".././atoms";
import { Great } from "../model/PVPoke/Great";
import { Ultra } from "../model/PVPoke/Ultra";
import { Master } from "../model/PVPoke/Master";
import { Comet } from "../model/PVPoke/Comet";
import { Twilight } from "../model/PVPoke/Twilight";

type Props = {
  tournament: Tournament;
};

const copyPVP = async (copyText: string) => {
  await navigator.clipboard.writeText(copyText);
  alert("copied!");
};

const TournamentContainer: FunctionComponent<Props> = ({ tournament }) => {
  const [moves, setMoves] = useState(Great);
  const [league, setLeague] = useRecoilState(leagueFilterState);

  useEffect(() => {
    if (tournament.league === "Ultra League") {
      setMoves(Ultra);
    } else if (tournament.league === "Master League") {
      setMoves(Master);
    } else if (tournament.league === "Comet") {
      setMoves(Comet);
    } else if (tournament.league === "Twilight") {
      setMoves(Twilight);
    } else if (tournament.league === "Great League") {
      setMoves(Great);
    }
  }, [tournament.league]);

  const copyArray = tournament.pokemon.map(
    (pokemon: Pokemon, index: number) =>
      pokemon.name +
      "," +
      moves.find((o) => o.speciesId === pokemon.name.toLowerCase())
        ?.moveset[0] +
      "," +
      moves.find((o) => o.speciesId === pokemon.name.toLowerCase())
        ?.moveset[1] +
      "," +
      moves.find((o) => o.speciesId === pokemon.name.toLowerCase())?.moveset[2]
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
            <PokemonContainer
              key={pokemon.name + (index + 1)}
              {...pokemon}
              moves={
                moves.find((o) => o.speciesId === pokemon.name.toLowerCase())
                  ?.moveset
              }
            />
          </>
        ))}
      </Flex>
      <Text align="center">{`Score:
        
         ${tournament.wins} -  ${tournament.losses}`}</Text>
      <Center>
        <Button onClick={() => copyPVP(copyArray.toString())} mb="3">
          Copy Team
        </Button>
      </Center>
    </Box>
  );
};
export default TournamentContainer;
