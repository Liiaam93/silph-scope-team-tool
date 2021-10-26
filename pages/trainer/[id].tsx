import { NextPage } from "next";
import Navbar from "../../components/Navbar";
import { Flex } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import { Tournament } from "../../types";

const Details: NextPage<Props> = ({ tournaments }) => {
  console.log(tournaments);
  return (
    <>
      <Navbar />
    </>
  );
};
type Props = {
  tournaments: Tournament[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.query.id);
  const trainerName = context.query.id?.toString();
  const res = await fetch(`http://localhost:3000/api/trainer/${trainerName}`);
  const tournaments: any = await res.json();

  return { props: { tournaments } };
};
export default Details;
