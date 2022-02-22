import { Flex, Text } from "@chakra-ui/layout";
import { Pokemon, PokemonStats } from "../types";
import { FunctionComponent } from "react";
import React, { useState, useEffect } from "react";
import { leagueFilterState } from ".././atoms";
import { atom, useRecoilState, selector } from "recoil";
import { get } from "lodash";

import { Box, Image } from "@chakra-ui/react";
const PokemonContainer: FunctionComponent<Pokemon> = ({ ...pokemon }) => {
  const [league, setLeague] = useRecoilState(leagueFilterState);

  let bgc = "#929C69";
  let bgi = "/";
  pokemon.name.includes("Shadow")
    ? ((bgc = "#9B7DA3"), (bgi = "/shadowbackdrop.png"))
    : "";
  let backgroundTexture;
  pokemon.tLeague.includes("Cave") ? (backgroundTexture = "/cave.jpeg") : "";

  pokemon.tLeague.includes("Fusion")
    ? (backgroundTexture = "/fusion.jpeg")
    : "";
  pokemon.tLeague.includes("Great") ? (backgroundTexture = "/glg.png") : "";
  pokemon.tLeague.includes("Ultra") ? (backgroundTexture = "/ULG.png") : "";
  pokemon.tLeague.includes("Master") ? (backgroundTexture = "/mlg.png") : "";
  pokemon.tLeague.includes("Comet") ? (backgroundTexture = "/comets.jpg") : "";
  pokemon.tLeague.includes("Fusion") ? (backgroundTexture = "/fusion.png") : "";
  pokemon.tLeague.includes("Twilight")
    ? (backgroundTexture = "/twilight.png")
    : "";
  pokemon.tLeague.includes("Floating")
    ? (backgroundTexture = "/floating.png")
    : "";
  pokemon.tLeague.includes("Atlantis")
    ? (backgroundTexture = "/atlantis.jpg")
    : "";

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
        <Box
          mt="6px"
          borderRadius="lg"
          border="1px"
          w="max"
          backgroundImage={backgroundTexture}
        >
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            border="1px"
            borderRadius="lg"
            w="max"
            // bg={bgc}
            backgroundImage={bgi}
            pl="15px"
            pr="15px"
          />
        </Box>
        <Text color="black">{pokemon.name}</Text>
        <Text fontSize="smaller" color="grey.800">
          {pokemon.moves && pokemon.moves[0]}
        </Text>
        <Text fontSize="smaller" color="grey.800">
          {pokemon.moves && pokemon.moves[1]}
        </Text>
        <Text fontSize="smaller" color="grey.800">
          {pokemon.moves && pokemon.moves[2]}
        </Text>
      </Flex>
    </>
  );
};
export default PokemonContainer;
