import { NextPage } from "next";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { Box, Flex } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import { Tournament, TrainerData } from "../../types";
import { fetchUserTournaments } from "../utils/scrape/silph";
import TeamsContainer from "../../components/TeamsContainer";
import TrainerContainer from "../../components/TrainerContainer";
import { fetchTrainerData } from "../utils/scrape/silph-trainer-data";
import { Select } from "@chakra-ui/react";

const UserPage: NextPage<Props> = ({ tournaments, trainerData }) => {
  const [leagueFilter, setLeagueFilter] = useState("");
  const [leagueToggle, setLeagueToggle] = useState(false);

  return (
    <>
      <Navbar pb="15vh" />
      <Box bg="grey" pt={["15vh", "10vh"]}>
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
        {tournaments.map((tournament: Tournament, index: number) => (
          <TeamsContainer
            key={tournament.bout + index.toString()}
            tournament={tournament}
            leagueFilter={leagueFilter}
          />
        ))}
      </Box>
    </>
  );
};
type Props = {
  tournaments: Tournament[];
  trainerData: TrainerData;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const trainerName = context.query.id?.toString();
  //const res = await fetch(`http://localhost:3000/api/trainer/${trainerName}`);
  const tournaments = await fetchUserTournaments(`${trainerName}`);
  const trainerData = await fetchTrainerData(`${trainerName}`);
  return { props: { tournaments, trainerData } };
};
export default UserPage;
