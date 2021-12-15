import { Flex, Text } from "@chakra-ui/layout";
import { PlayerStats } from "../types";
import { FunctionComponent } from "react";
import { Image } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { useRouter } from "next/router";

const FactionMemberContainer: FunctionComponent<PlayerStats> = ({
  ...playerStats
}) => {
  const router = useRouter();

  return (
    <>
      <Flex
        color="black"
        w="200px"
        maxW="45vw"
        mt="5px"
        pb="10px"
        flexDir="column"
        mr="5px"
        border="1px"
        borderRadius="md"
        align="center"
        bg="lightblue"
      >
        <Button
          bg="gold"
          shadow="outline"
          mt="5px"
          mb="10px"
          onClick={() => router.push(`/trainer/${playerStats.name}`)}
        >
          {playerStats.name}
        </Button>
        <Text color="grey">Role</Text>
        <Text m="5px" mt="0px" textAlign="center">
          {playerStats.role} {playerStats.role !== "Alternate" && "Specialist"}
        </Text>{" "}
        <Text color="grey">Bouts Played</Text>
        <Text textAlign="center">{playerStats.matches}</Text>
        <Text color="grey">Points Earned</Text>
        <Text textAlign="center">{playerStats.score}</Text>
        <Text color="grey">Win Rate</Text>
        <Text>
          {(
            (parseInt(playerStats.score) / playerStats.totalBattles) *
            100
          ).toFixed(2) + "%"}
        </Text>
      </Flex>
    </>
  );
};
export default FactionMemberContainer;
