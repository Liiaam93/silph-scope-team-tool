import { TrainerData } from "../../../types";
import { fetchUserTournaments } from "./silph";

export const fetchTrainerData = async (
  player: string
): Promise<TrainerData> => {
  const req = await fetch(`https://sil.ph/${player}.json`);
  const json = await req.json();
  const playerName = json.data.in_game_username;
  const avatar = json.data.avatar;
  const data = await fetchUserTournaments(player);

  let wr: number = 0;
  let lr: number = 0;

  for (let i = 0; i < data.tournaments.length; i++) {
    wr = wr + data.tournaments[i].wins;
  }
  for (let i = 0; i < data.tournaments.length; i++) {
    lr = lr + data.tournaments[i].losses;
  }
  const maxPoints: number = wr + lr;
  let winRate = parseFloat(((wr / maxPoints) * 100).toFixed(2));

  const trainerData = {
    playerName,
    avatar,
    winRate,
  };

  return trainerData;
};
