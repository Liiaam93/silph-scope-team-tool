import { NextPage } from "next";
import Navbar from "../../components/Navbar";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import { SquadStats, TrainerData } from "../../types";
import { fetchSquadData } from "../../utils/scrape/silph-factions";
import FactionContainer from "../../components/FactionContainer";
import FactionMemberContainer from "../../components/FactionMemberContainer";

const FactionPage: NextPage<Props> = ({ factionData }) => {
  return (
    <>
      <Navbar />
      <Box bg="grey" pt={["20vh", "15vh", "10vh"]} minH="100vh">
        <FactionContainer {...factionData} />
        <Flex wrap="wrap" maxW="1200px" m="auto" justify="center">
          {factionData.playerStats.map(
            (player) =>
              player.name !== "" && (
                <FactionMemberContainer key={player.name} {...player} />
              )
          )}
        </Flex>
      </Box>
    </>
  );
};
type Props = {
  factionData: SquadStats;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const factionID = context.query.id?.toString();
  //const res = await fetch(`http://localhost:3000/api/trainer/${trainerName}`);
  const factionData = await fetchSquadData(`${factionID}`);
  return { props: { factionData } };
};
export default FactionPage;
