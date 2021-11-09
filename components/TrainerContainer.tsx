import { Flex, Text, Box } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { TrainerData } from "../types";

const TrainerContainer: FunctionComponent<TrainerData> = ({
  ...trainerData
}) => {
  return (
    <>
      <Flex
        m="auto"
        mt="10px"
        align="center"
        w="fit-content"
        border="1px black solid"
        bg="lightblue"
        color="black"
        p="10px"
        borderRadius="lg"
      >
        <Image
          alt={trainerData.playerName}
          src={trainerData.avatar}
          bg="lightblue"
          w="100px"
          borderRadius="3xl"
          pr="5px"
        />

        <Flex flexDir="column" alignSelf="flex-start" pl="5px">
          <Text fontSize="2xl">{trainerData.playerName}</Text>
        </Flex>
      </Flex>
    </>
  );
};

export default TrainerContainer;
