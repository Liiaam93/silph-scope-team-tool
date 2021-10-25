import { NextPage } from "next";
import { HStack, Text, Flex } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { useState } from "react";
import { useRouter } from "next/router";

import { factions } from "../model/Factions";

const Navbar: NextPage = () => {
  const router = useRouter();
  const [trainerName, setTrainerName] = useState("");
  const [squadName, setSquadName] = useState("default");
  const [trainerData, setTrainerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [squadData, setSquadData] = useState([]);

  const loadTrainerData = async () => {
    setLoading(true);
    const req = await fetch(`/api/player/${trainerName}`);
    const json = await req.json();
    setTrainerData(json);
    setLoading(false);
  };

  const loadSquadData = async () => {
    setLoading(true);
    const req = await fetch(`/api/squad/${squadName}`);
    const json = await req.json();
    setSquadData(json);
    setLoading(false);
    setTrainerData([]);
  };

  return (
    <>
      <HStack
        wrap="wrap"
        zIndex="sticky"
        position="fixed"
        bg="#525252"
        w="100%"
        p="5px"
      >
        <Text color="gold" m="auto">
          Silph Team Finder
        </Text>
        <Flex w="xl" pb="5px">
          <Select
            value={squadName}
            onChange={(e) => setSquadName(e.target.value)}
            bg="#F0F8FF"
          >
            <option value="default" selected disabled hidden>
              Choose a Team
            </option>

            {Object.keys(factions).map((key) => (
              <option key={key} value={key}>
                {factions[key]}
              </option>
            ))}
          </Select>
          <Button
            ml="5px"
            mr="5px"
            fontSize="sm"
            background="gold"
            _hover={{
              background: "white",
              color: "black",
            }}
            onClick={() => loadSquadData()}
          >
            Load Team
          </Button>
        </Flex>
        <Flex w="xl">
          <Input
            bg="#F0F8FF"
            value={trainerName}
            id="player"
            placeholder="... or type a Trainer Name"
            onChange={(e) => setTrainerName(e.target.value)}
          />
          <Button
            ml="5px"
            mr="5px"
            fontSize="sm"
            background="gold"
            _hover={{
              background: "white",
              color: "black",
            }}
            onClick={() => router.push(`/trainer/${trainerName}`)}
            id="pbtn"
          >
            Load Player
          </Button>
        </Flex>
      </HStack>
      {loading && <Flex>Loading...</Flex>}
    </>
  );
};
export default Navbar;
