import { Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { SquadStats } from "../types";

const FactionContainer: FunctionComponent<SquadStats> = ({
  ...factionData
}) => {
  return (
    <Flex
      m="auto"
      mt="10px"
      align="center"
      w={["fit-content"]}
      boxShadow="dark-lg"
      bg="lightblue"
      color="black"
      p="10px"
      borderRadius="lg"
    >
      <Image
        alt={factionData.teamName}
        src={factionData.logo}
        bg="lightblue"
        w="100px"
        borderRadius="3xl"
        pr="5px"
        mr="5px"
      />

      <Flex flexDir="column" m="auto">
        <Text fontSize={["3xl", "2xl"]}>{factionData.teamName}</Text>
        <Text>Win Rate:</Text>
        <Text fontSize="2xl"> {factionData.winLoss}</Text>
      </Flex>
    </Flex>
  );
};

export default FactionContainer;
