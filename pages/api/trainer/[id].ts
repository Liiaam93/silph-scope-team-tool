import { NextApiRequest, NextApiResponse } from "next";
import { Tournament } from "../../../types";
import { fetchUserTournaments } from "../../utils/scrape/silph";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const details: Tournament[] = await fetchUserTournaments(
      req.query.id as string
    );
    res.status(200).json(details);
  } catch (err) {
  } finally {
  }
};
