import { TrainerData } from "../../../types";

export const fetchTrainerData = async (
  player: string
): Promise<TrainerData> => {
  const req = await fetch(`https://sil.ph/${player}.json`);
  const json = await req.json();
  const playerName = json.data.in_game_username;
  const avatar = json.data.avatar;

  const trainerData = {
    playerName,
    avatar,
  };

  return trainerData;
};
