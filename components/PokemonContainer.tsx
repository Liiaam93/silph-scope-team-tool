import { Flex, Text } from "@chakra-ui/layout";
import { Pokemon, PokemonStats } from "../types";
import { FunctionComponent } from "react";
import React, { useState, useEffect } from "react";
import { leagueFilterState } from ".././atoms";
import { atom, useRecoilState, selector } from "recoil";
import { get } from "lodash";

import { Image } from "@chakra-ui/react";

import { Great } from "../model/PVPoke/Great";
import { Ultra } from "../model/PVPoke/Ultra";
import { Master } from "../model/PVPoke/Master";
import { Comet } from "../model/PVPoke/Comet";
import { Twilight } from "../model/PVPoke/Twilight";

const PokemonContainer: FunctionComponent<Pokemon> = ({ ...pokemon }) => {
  const [league, setLeague] = useRecoilState(leagueFilterState);
  const [moves, setMoves] = useState({});

  useEffect(() => {
    if (league === "Great League" || league === "Great") {
      setMoves(Great);
      console.log(moves);
    }
  }, [league]);

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
        key={pokemon.name}
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
        {/* 
        {league && (
          <>
            {get(
              moves,
              `[${pokemon.name.toLowerCase()}].moveset`,
              []
            ).map((name: string) => (
              <Text color="darkslategrey" fontSize="sm">
                {name}
              </Text>
            ))}
          </>
        )} */}
      </Flex>
    </>
  );
};
export default PokemonContainer;
