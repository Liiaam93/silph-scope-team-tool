import { Flex, Text } from "@chakra-ui/layout";
import { PlayerStats } from "../types";
import { FunctionComponent } from "react";
import { VStack, Image } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { useRouter } from "next/router";

const FactionMemberContainer: FunctionComponent<PlayerStats> = ({
  ...playerStats
}) => {
  const router = useRouter();

  return (
    <>
      <Flex
        boxShadow="dark-lg"
        color="black"
        w="200px"
        maxW="45vw"
        mt="5px"
        pb="10px"
        flexDir="column"
        mr="5px"
        borderRadius="md"
        align="center"
        bg="lightblue"
      >
        <VStack
          border="2px solid white"
          w="85%"
          mt="5px"
          bg="teal.800"
          borderRadius="5px"
          onClick={() => router.push(`/trainer/${playerStats.name}`)}
        >
          <Image src={playerStats.avatar} alt="" mt="5px" />
          <Text color="white" w="fit-content">
            {playerStats.name}
          </Text>
        </VStack>
        <Text m="5px" mt="0px" textAlign="center" fontSize="smaller">
          {playerStats.role} {playerStats.role !== "Alternate" && "Specialist"}
        </Text>{" "}
        <Text color="grey">
          Bouts Played:{" "}
          <Text as="span" textAlign="center" color="black">
            {playerStats.matches}
          </Text>
        </Text>
        <Text color="grey">
          Points Earned:{" "}
          <Text as="span" textAlign="center" color="black">
            {playerStats.score}
          </Text>
        </Text>
        <Text color="grey">
          Win Rate:{" "}
          <Text as="span" color="black" textAlign="center">
            {(
              (parseInt(playerStats.score) / playerStats.totalBattles) *
              100
            ).toFixed(2) + "%"}
          </Text>
        </Text>
        <Button
          w="80%"
          white-space="normal"
          fontSize="sm"
          bg="gold"
          shadow="outline"
          mt="5px"
          mb="5px"
          onClick={() => router.push(`/trainer/${playerStats.name}`)}
        >
          View Trainer Teams
        </Button>
      </Flex>
    </>
  );
};
export default FactionMemberContainer;
