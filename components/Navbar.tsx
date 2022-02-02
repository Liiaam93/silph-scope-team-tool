import { NextPage } from "next";
import { HStack, Text, Flex } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { factions } from "../model/Factions";
import { trainerNameState } from ".././atoms";
import { factionNameState } from ".././atoms";

const Navbar: NextPage = () => {
  const router = useRouter();
  const [trainerName, setTrainerName] = useRecoilState(trainerNameState);
  const [squadID, setSquadID] = useRecoilState(factionNameState);
  const [trainerData, setTrainerData] = useState([]);
  const [squadData, setSquadData] = useState([]);

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
        <NextLink href="/" passHref>
          <Link color="gold" m="auto">
            Silph Scope
          </Link>
        </NextLink>
        <Flex w="xl" pb="5px">
          <Select
            onChange={(e) => setSquadID(e.target.value)}
            bg="#F0F8FF"
            defaultValue={"default"}
          >
            <option value="default" disabled>
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
            onClick={() => router.push(`/faction/${squadID}`)}
            id="pbtn"
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
    </>
  );
};
export default Navbar;
