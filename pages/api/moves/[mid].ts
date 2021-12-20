import { NextApiRequest, NextApiResponse } from "next";
import { getMoveData } from "../../../utils/api/pvpoke";

type League = "Great" | "Twilight" | "Master" | "Ultra" | "Comet";

const handlers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const details = await getMoveData(req.query.mid as League);
    res.status(200).json(details);
  } catch (err) {
  } finally {
  }
};
export default handlers;
