import { NextPage } from "next";
import { HStack, Box } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/input";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { factions } from "../model/Factions";
import { trainerNameState } from ".././atoms";
import { factionNameState } from ".././atoms";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

const Navbar: NextPage = () => {
  const router = useRouter();
  const [trainerName, setTrainerName] = useRecoilState(trainerNameState);
  const [squadID, setSquadID] = useRecoilState(factionNameState);

  useEffect(() => {
    squadID === "default" ? "" : router.push(`/faction/${squadID}`);
    setSquadID("default");
  }, [squadID]);

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

          {factions
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
        </Select>
        {/* <Button
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
        </Button> */}
      </HStack>
      <HStack
        w={["100vw", "100vw", "47vw", "43vw"]}
        p="1px"
        m="auto"
        color={"black"}
      >
        <InputGroup>
          <Input
            bg="#F0F8FF"
            value={trainerName}
            id="player"
            _placeholder={{ color: "grey" }}
            placeholder="... or type a Trainer Name"
            onChange={(e) => setTrainerName(e.target.value)}
          />
          <InputRightAddon
            cursor={"pointer"}
            _hover={{ backgroundColor: "gold" }}
            onClick={() => router.push(`/trainer/${trainerName}`)}
            children={<SearchIcon />}
          />
        </InputGroup>
        {/* <Button
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
        </Button> */}
      </HStack>
    </HStack>
  );
};
export default Navbar;
