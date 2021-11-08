import { NextPage } from "next";
import Navbar from "../../components/Navbar";
import { Box, Flex } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import { Tournament } from "../../types";
import { fetchUserTournaments } from "../utils/scrape/silph";
import TeamsContainer from "../../components/TeamsContainer";

const UserPage: NextPage<Props> = ({ tournaments }) => {
  return (
    <>
      <Navbar />
      <Box bg="grey" pt="30px">
        {tournaments.map((tournament: Tournament, index: number) => (
          <TeamsContainer key={tournament.league + index} {...tournament} />
        ))}
      </Box>
    </>
  );
};
type Props = {
  tournaments: Tournament[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const trainerName = context.query.id?.toString();
  //const res = await fetch(`http://localhost:3000/api/trainer/${trainerName}`);
  const res = await fetchUserTournaments(`${trainerName}`);
  const tournaments = res;

  return { props: { tournaments } };
};
export default UserPage;
