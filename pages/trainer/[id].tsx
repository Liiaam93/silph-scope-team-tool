import { NextPage } from "next";
import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/layout";
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
        pt={["15vh", "10vh", "0"]}
        minHeight="100vh"
        flexDir="column"
        alignContent="center"
        bgColor="#414141"
        key={trainerData.playerName}
      >
        <Flex
          wrap="wrap"
          mt={["20%", "10%", "15%", "5%"]}
          m="auto"
          p="2"
          backgroundColor="gray"
          borderRadius={10}
          pt={[10, 0]}
        >
          <TrainerContainer trainerData={trainerData} roster={roster} />
          <VStack m="auto" p="2">
            <Roster {...roster} />
            <Select
              m="auto"
              mt="0px"
              mb="5"
              bg="whitesmoke"
              onChange={(e) => setLeagueFilter(e.target.value)}
              defaultValue={""}
              placeholder="All Leagues"
              color={"black"}
              _placeholder={{ color: "black" }}
            >
              <option
                style={{
                  backgroundColor: "#282828	",
                  fontStyle: "italic",
                  color: "white",
                }}
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
              <option
                style={{ backgroundColor: "whitesmoke" }}
                value="Justicar"
              >
                Justicar
              </option>

              <option
                style={{ backgroundColor: "whitesmoke" }}
                value="Master League"
              >
                Master League
              </option>
              <option style={{ backgroundColor: "whitesmoke" }} value="Arcana">
                Arcana
              </option>
              <option
                style={{ backgroundColor: "whitesmoke" }}
                value="Catacomb"
              >
                Catacomb
              </option>
              <option
                style={{
                  backgroundColor: "#282828	",
                  fontStyle: "italic",
                  color: "white",
                }}
                disabled
              >
                Old Cups
              </option>
              <option
                style={{ backgroundColor: "whitesmoke" }}
                value="Ultra League"
              >
                Ultra League
              </option>

              <option style={{ backgroundColor: "whitesmoke" }} value="Ember">
                Ember
              </option>
              <option
                style={{ backgroundColor: "whitesmoke" }}
                value="Vanguard"
              >
                Vanguard
              </option>

              <option
                style={{ backgroundColor: "whitesmoke" }}
                value="Primeval"
              >
                Primeval
              </option>
              <option
                style={{ backgroundColor: "whitesmoke" }}
                value="Sorcerous"
              >
                Sorcerous
              </option>
              <option
                style={{ backgroundColor: "whitesmoke" }}
                value="Timeless"
              >
                Timeless
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
              <option
                style={{ backgroundColor: "whitesmoke" }}
                value="Twilight"
              >
                Twilight
              </option>
              <option style={{ backgroundColor: "whitesmoke" }} value="Colony">
                Colony
              </option>
              <option style={{ backgroundColor: "whitesmoke" }} value="Alchemy">
                Alchemy
              </option>
              <option
                style={{ backgroundColor: "whitesmoke" }}
                value="Celestial"
              >
                Celestial (Ultra League){" "}
              </option>
            </Select>
          </VStack>
        </Flex>

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
