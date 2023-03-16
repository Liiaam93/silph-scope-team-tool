import { Box, Flex, Text, VStack } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { PokemonArray, TrainerData } from "../types";

interface TrainerStats {
  trainerData: TrainerData;
  roster: PokemonArray[];
}

const TrainerContainer: FunctionComponent<TrainerStats> = ({
  trainerData,
  roster,
}) => {
  return (
    <>
      <Flex
        m="auto"
        w={["90vw", "50vw", "30vw"]}
        backgroundColor="lightblue"
        borderRadius="10"
        flexDirection="row"
        color="black"
        justifyContent="center"
        mb="10px"
      >
        <Box w="30vw" justifyContent={"center"} m="auto">
          <Image src={trainerData.avatar} w="100px" align="center" m="auto" />
        </Box>
        <Text
          m="auto"
          w={"30vw"}
          textAlign="center"
          color="black"
          fontSize={["l", "xl"]}
        >
          {trainerData.playerName}
        </Text>
        <VStack w={"30vw"} justifyContent="center" m="auto">
          <Text>Win Rate</Text>
          <Text
            textShadow={"0 0 2px black, 0 0 2px black"}
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
        </VStack>
      </Flex>
      {/* <Flex
        m="auto"
        mt={["6vh", "8vh", "6vh"]}
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
        </Flex>
      </Flex> */}
    </>
  );
};

export default TrainerContainer;
