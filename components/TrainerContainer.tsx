import { Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { TrainerData } from "../types";

interface TrainerStats {
  trainerData: TrainerData;
  faction: string;
}

const TrainerContainer: FunctionComponent<TrainerStats> = ({
  trainerData,
  faction,
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
          <Text>Win Rate:</Text>
          <Text
            textShadow={"0 0 1px black, 0 0 1px black"}
            fontWeight="700"
            fontSize="xl"
            color={
              (trainerData.winRate > 50 && "green") ||
              (trainerData.winRate < 40 && "red") ||
              "orange"
            }
          >
            {trainerData.winRate}%
          </Text>
          <Text>{faction}+</Text>
        </Flex>
      </Flex>
    </>
  );
};

export default TrainerContainer;
