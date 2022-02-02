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

const Nav: NextPage = () => {
  const router = useRouter();
  const [trainerName, setTrainerName] = useRecoilState(trainerNameState);
  const [squadID, setSquadID] = useRecoilState(factionNameState);
  const [trainerData, setTrainerData] = useState([]);
  const [squadData, setSquadData] = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Flex>
        <Flex pos="fixed" top="1rem" align="center"></Flex>
      </Flex>
    </>
  );
};
export default Nav;
