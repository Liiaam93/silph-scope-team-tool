import { NextApiRequest, NextApiResponse } from "next";
import { Result } from "../../../types";
import { fetchUserTournaments } from "../../../utils/scrape/silph";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const details: Result = await fetchUserTournaments(req.query.id as string);
    res.status(200).json(details);
  } catch (err) {
  } finally {
  }
};
export default handler;
