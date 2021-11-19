import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { Select } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { get } from "lodash";

import {
  Tournament,
  TrainerData,
  PokemonArray,
  PokemonStats,
} from "../../types";
import { fetchUserTournaments } from "../utils/scrape/silph";
import { fetchTrainerData } from "../utils/scrape/silph-trainer-data";
import { getMoveData } from "../utils/api/pvpoke";

import Navbar from "../../components/Navbar";
import TrainerContainer from "../../components/TrainerContainer";
import TournamentContainer from "../../components/TournamentContainer";
import Roster from "../../components/Roster";

const UserPage: NextPage<Props> = ({ tournaments, trainerData, roster }) => {
  const [leagueFilter, setLeagueFilter] = useState("");
  const [leagueToggle, setLeagueToggle] = useState(false);
  const [moves, setMoves] = useState<PokemonStats[]>();

  useEffect(() => {
    if (leagueFilter === "") return;
    const getMoves = async () => {
      const req = await getMoveData(leagueFilter);
      setMoves(req);
      setLeagueToggle(true);
    };
    getMoves();
  }, [leagueFilter]);

  return (
    <>
      <Navbar />
      <Flex
        pt="15vh"
        minHeight="100vh"
        flexDir="column"
        alignContent="center"
        bgColor="#414141"
      >
        <TrainerContainer {...trainerData} />

        <Select
          w="50%"
          m="auto"
          mt="10px"
          bg="whitesmoke"
          onChange={(e) => setLeagueFilter(e.target.value)}
        >
          <option value="Great">Great</option>
          <option value="Ultra">Ultra</option>
          <option value="Master">Master</option>
          <option value="Comet">Comet</option>
          <option value="Twilight">Twilight</option>
        </Select>
        <Button w="25%">Click</Button>
        <Roster {...roster} />

        {tournaments.map((tournament: Tournament, index: number) => (
          <TournamentContainer
            key={tournament.bout + index.toString()}
            tournament={tournament}
            leagueFilter={leagueFilter}
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
