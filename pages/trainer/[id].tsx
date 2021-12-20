import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import { Select } from "@chakra-ui/react";
import { get } from "lodash";
import { atom, useRecoilState, selector } from "recoil";
import {
  Tournament,
  TrainerData,
  PokemonArray,
  PokemonStats,
} from "../../types";
import { fetchUserTournaments } from "../../utils/scrape/silph";
import { fetchTrainerData } from "../../utils/scrape/silph-trainer-data";
import Navbar from "../../components/Navbar";
import TrainerContainer from "../../components/TrainerContainer";
import TournamentContainer from "../../components/TournamentContainer";
import Roster from "../../components/Roster";
import { leagueFilterState } from "../../atoms";

const UserPage: NextPage<Props> = ({
  tournaments,
  trainerData,
  roster,
  faction,
}) => {
  const [leagueFilter, setLeagueFilter] =
    useRecoilState<string>(leagueFilterState);

  return (
    <>
      <Navbar />
      <Flex
        pt={["20vh", "10vh"]}
        minHeight="100vh"
        flexDir="column"
        alignContent="center"
        bgColor="#414141"
        key={trainerData.playerName}
      >
        <TrainerContainer faction={faction} trainerData={trainerData} />

        <Select
          w="50%"
          m="auto"
          mt="10px"
          bg="whitesmoke"
          onChange={(e) => setLeagueFilter(e.target.value)}
          defaultValue={""}
          placeholder="All Leagues"
        >
          <option value="Great League">Great League</option>
          <option value="Ultra League">Ultra League</option>
          <option value="Master League">Master League</option>
          <option value="Comet">Comet</option>
          <option value="Twilight">Twilight</option>
        </Select>
        <Roster {...roster} />

        {tournaments
          .filter(({ league }) => {
            if (!leagueFilter.trim()) return true;
            return league === leagueFilter;
          })
          .map((t: Tournament, index: number) => (
            <TournamentContainer
              key={t.league + t.bout + index}
              tournament={t}
            />
          ))}
      </Flex>
    </>
  );
};
type Props = {
  tournaments: Tournament[];
  trainerData: TrainerData;
  roster: PokemonArray[];
  faction: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const trainerName = context.query.id?.toString();
  //const res = await fetch(`http://localhost:3000/api/trainer/${trainerName}`);
  const data = await fetchUserTournaments(`${trainerName}`);
  const tournaments = data.tournaments;
  const roster = data.roster;
  const trainerData = await fetchTrainerData(`${trainerName}`);
  return { props: { tournaments, trainerData, roster } };
};
export default UserPage;
