import { NextPage } from "next";
import { HStack, Text, Flex, Box } from "@chakra-ui/layout";
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
    <HStack
      wrap="wrap"
      zIndex="sticky"
      position="fixed"
      bg="#525252"
      w="100%"
      p="5px"
    >
      <Box
        textAlign="center"
        width={["100vw", "100vw", "100vw", "100vw", "10%"]}
      >
        <NextLink href="/" passHref>
          <Link
            fontWeight="350"
            color="gold"
            textShadow="-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
            fontSize="2xl"
          >
            Silph-Scope
          </Link>
        </NextLink>
      </Box>
      <HStack w={["100vw", "100vw", "47vw", "43vw"]} p="1px" m="auto">
        <Select
          onChange={(e) => setSquadID(e.target.value)}
          bg="#F0F8FF"
          defaultValue={"default"}
          color="grey"
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
          color={"black"}
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
      </HStack>
      <HStack
        w={["100vw", "100vw", "47vw", "43vw"]}
        p="1px"
        m="auto"
        color={"black"}
      >
        <Input
          bg="#F0F8FF"
          value={trainerName}
          id="player"
          _placeholder={{ color: "grey" }}
          placeholder="... or type a Trainer Name"
          onChange={(e) => setTrainerName(e.target.value)}
        />
        <Button
          color={"black"}
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
      </HStack>
    </HStack>
  );
};
export default Navbar;
