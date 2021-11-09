import { NextPage } from "next";
import Navbar from "../../components/Navbar";
import { Box, Flex } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import { Tournament, TrainerData } from "../../types";
import { fetchUserTournaments } from "../utils/scrape/silph";
import TeamsContainer from "../../components/TeamsContainer";
import TrainerContainer from "../../components/TrainerContainer";
import { fetchTrainerData } from "../utils/scrape/silph-trainer-data";

const UserPage: NextPage<Props> = ({ tournaments, trainerData }) => {
  console.log(trainerData);
  return (
    <>
      <Navbar />
      <Box bg="grey" pt="15vh">
        <TrainerContainer {...trainerData} />
        {tournaments.map((tournament: Tournament, index: number) => (
          <TeamsContainer key={tournament.league + index} {...tournament} />
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
