import { NextPage } from "next";
import Navbar from "../../components/Navbar";
import { Flex, Text } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import { GetServerSidePropsContext } from "next";
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";

const Details: NextPage = ({ data }) => {
  return (
    <>
      <Navbar />
      <Flex pt="15%">
        <Image src={data.data.avatar} />
        <Text>{data.data.in_game_username}</Text>
      </Flex>
    </>
  );
};
type Data = {};

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.query.id);
  const trainerName = context.query.id?.toString();
  const res = await fetch(`https://sil.ph/${trainerName}.json`);
  const data: any = await res.json();
  console.log(data);

  return { props: { data } };
};
export default Details;
