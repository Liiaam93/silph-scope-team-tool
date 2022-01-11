import React from "react";
import { FunctionComponent } from "react";
import { Box, HStack, VStack, Center, Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { PokemonArray } from "../types";
import { leagueFilterState } from "../atoms";
import { useRecoilState } from "recoil";

const copyPVP = async (copyText: string) => {
  await navigator.clipboard.writeText(copyText);
  alert("copied!");
};

const Roster: FunctionComponent<PokemonArray[]> = ({ ...roster }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [leagueFilter, setLeagueFilter] = useRecoilState(leagueFilterState);

  const copyArray = Object.keys(roster).map((mon, i) =>
    roster[i].tLeague === leagueFilter || !leagueFilter
      ? roster[i].name +
        "," +
        roster[i].moves[0] +
        "," +
        roster[i].moves[1] +
        "," +
        roster[i].moves[2] +
        "\n"
      : ""
  );

  return (
    <>
      <Button bg="gold" m="auto" mt="10px" maxW="50%" onClick={onOpen}>
        View Player Roster
      </Button>
      <Modal size={"5xl" || "md"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay w="100vw" />
        <ModalContent bg="white">
          <ModalHeader align="center">Roster</ModalHeader>
          <ModalCloseButton />
          <Button
            background="grey"
            _hover={{
              background: "gold",
              color: "black",
            }}
            m="auto"
            w="fit-content"
            onClick={() => copyPVP(copyArray.join(""))}
            mb="3"
          >
            Copy Full Roster
          </Button>
          <ModalBody>
            <Flex wrap="wrap" dir="row" m="auto">
              {Object.keys(roster).map(
                (keyName, i) =>
                  (roster[i].tLeague === leagueFilter || !leagueFilter) && (
                    <VStack key={i} maxW="25%" m="auto">
                      <Image src={roster[i].sprite} alt={roster[i].name} />
                      <Text fontSize="xs">{roster[i].name}</Text>
                      <Text>{roster[i].count}</Text>
                    </VStack>
                  )
              )}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Roster;
