import React from "react";
import { FunctionComponent } from "react";
import { Box, HStack, VStack } from "@chakra-ui/layout";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
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

const Roster: FunctionComponent<PokemonArray[]> = ({ ...roster }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button bg="gold" m="auto" mt="10px" maxW="50%" onClick={onOpen}>
        See Players Full Roster
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="white">
          <ModalHeader align="center">Roster</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex wrap="wrap" dir="row">
              {Object.keys(roster).map((keyName, i) => (
                <VStack key={i} w="25%">
                  <Image src={roster[i].sprite} alt={roster[i].name} />
                  <Text fontSize="xs">{roster[i].name}</Text>
                  <Text>{roster[i].count}</Text>
                </VStack>
              ))}
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
