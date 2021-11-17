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
        <Text>{playerStats.role}</Text>
        <Text>{playerStats.score}</Text>
        <Text>{playerStats.matches}</Text>
        <Text>{playerStats.totalBattles}</Text>
      </Flex>
    </>
  );
};
export default FactionMemberContainer;
