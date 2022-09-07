import { NextPage } from "next";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import { MenuItemOption, Select } from "@chakra-ui/react";
import { atom, useRecoilState, selector } from "recoil";
import { Tournament, TrainerData, PokemonArray } from "../../types";
import { fetchUserTournaments } from "../../utils/scrape/silph";
import { fetchTrainerData } from "../../utils/scrape/silph-trainer-data";
import Navbar from "../../components/Navbar";
import TrainerContainer from "../../components/TrainerContainer";
import TournamentContainer from "../../components/TournamentContainer";
import Roster from "../../components/Roster";
import { leagueFilterState } from "../../atoms";

const UserPage: NextPage<Props> = ({ tournaments, trainerData, roster }) => {
  const [leagueFilter, setLeagueFilter] =
    useRecoilState<string>(leagueFilterState);

  return (
    <>
      <Navbar />
      <Flex
        pt={["15vh", "15vh", "10vh", "10vh", "5vh"]}
        minHeight="100vh"
        flexDir="column"
        alignContent="center"
        bgColor="#414141"
        key={trainerData.playerName}
      >
        <TrainerContainer trainerData={trainerData} />

        <Select
          m="auto"
          mt="10px"
          w="200px"
          bg="whitesmoke"
          onChange={(e) => setLeagueFilter(e.target.value)}
          defaultValue={""}
          placeholder="All Leagues"
        >
          <option
            style={{ backgroundColor: "whitesmoke", fontStyle: "italic" }}
            disabled
          >
            Current Cups
          </option>
          <option
            style={{ backgroundColor: "whitesmoke" }}
            value="Great League"
          >
            Great League
          </option>
          <option style={{ backgroundColor: "whitesmoke" }} value="Celestial">
            Celestial (Ultra League){" "}
          </option>
          <option
            style={{ backgroundColor: "whitesmoke" }}
            value="Master League"
          >
            Master League
          </option>
          <option style={{ backgroundColor: "whitesmoke" }} value="Primeval">
            Primeval
          </option>
          <option style={{ backgroundColor: "whitesmoke" }} value="Sorcerous">
            Sorcerous
          </option>
          <option style={{ backgroundColor: "whitesmoke" }} value="Timeless">
            Timeless
          </option>
          <option style={{ backgroundColor: "whitesmoke" }} disabled>
            Old Cups
          </option>
          <option
            style={{ backgroundColor: "whitesmoke" }}
            value="Ultra League"
          >
            Ultra League
          </option>
          <option style={{ backgroundColor: "whitesmoke" }} value="Cave">
            Cave
          </option>
          <option style={{ backgroundColor: "whitesmoke" }} value="Fusion">
            Fusion
          </option>
          <option style={{ backgroundColor: "whitesmoke" }} value="Comet">
            Comet
          </option>
          <option style={{ backgroundColor: "whitesmoke" }} value="Twilight">
            Twilight
          </option>
          <option style={{ backgroundColor: "whitesmoke" }} value="Colony">
            Colony
          </option>
          <option style={{ backgroundColor: "whitesmoke" }} value="Alchemy">
            Alchemy
          </option>
        </Select>

        <Roster {...roster} />

        {tournaments
          .filter(({ league }) => {
            if (!leagueFilter.trim()) return true;
            return league.includes(leagueFilter);
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
