import { NextPage } from "next";
import { HStack, Text, Flex } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import {
  FormControl,
  InputGroup,
  Link,
  InputRightElement,
} from "@chakra-ui/react";
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
  const inputRef = useRef<HTMLInputElement>(null);

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
          <Link
            fontSize="2xl"
            align="center"
            color="gold"
            w={["100vw", "100vw", "100vw", "100vw", "10%"]}
            fontFamily="Arial"
            textShadow="-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
          >
            Silph Scope
          </Link>
        </NextLink>
        <HStack w={["100vw", "100vw", "47vw", "43vw"]} p="1px" m="auto">
          <Select
            variant="filled"
            outline="solid 2px grey"
            defaultValue={"default"}
            onChange={(e) => setSquadID(e.target.value)}
          >
            <option value="default" disabled>
              Choose a Team
            </option>
            {Object.keys(factions).map((key) => (
              <option key={key} value={key}>
                {factions[key]}
              </option>
            ))}{" "}
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
            {" "}
            Load Faction
          </Button>
        </HStack>
        <HStack w={["100vw", "100vw", "47vw", "43vw"]} p="1px" m="auto">
          <Input
            variant="filled"
            placeholder="...or enter a trainer name"
            value={trainerName}
            id="player"
            onChange={(e) => setTrainerName(e.target.value)}
          ></Input>
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
            Load Trainer{"  "}
          </Button>
        </HStack>
      </HStack>
    </>
  );
};
export default Navbar;
