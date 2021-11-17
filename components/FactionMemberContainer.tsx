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
        m="auto"
        mt="10px"
        bg="cadetblue"
        border="1px solid black"
        borderRadius="lg"
        flexDir="column"
        alignItems="center"
        w="30%"
        p="10px"
      >
        <Button onClick={() => router.push(`/trainer/${playerStats.name}`)}>
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
