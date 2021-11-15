import { NextApiRequest, NextApiResponse } from "next";
import { Tournament } from "../../../types";
import { getMoveData } from "../../utils/api/pvpoke";

const handlers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const details = await getMoveData(req.query.mid as string);
    res.status(200).json(details);
  } catch (err) {
  } finally {
  }
};
export default handlers;
