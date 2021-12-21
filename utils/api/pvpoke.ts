import { PVPOKE } from "../../types";
import { Great } from "../../model/PVPoke/Great";
import { Ultra } from "../../model/PVPoke/Ultra";
import { Master } from "../../model/PVPoke/Master";
import { Comet } from "../../model/PVPoke/Comet";
import { Twilight } from "../../model/PVPoke/Twilight";

export interface PokemonStats {
  name: string;
  moveset: string[];
  score: number;
  counters: string[];
  matchups: string[];
  fastMoves: string[];
  chargedMoves: string[];
}
// type League = "Great" | "Twilight" | "Master" | "Ultra" | "Comet";

// const leaguePaths: Record<League, string> = {
//   Great: Great,
//   Twilight: Twilight,
//   Master: Master,
//   Ultra: Ultra,
//   Comet: Comet,
// };
const leaguePaths = {
  Great: Great,
  Twilight: Twilight,
  Master: Master,
  Ultra: Ultra,
  Comet: Comet,
};

// export const getMoveData = async (league: League): Promise<PokemonStats[]> => {
export const getMoveData = (league: string) => {
  // const url: string = leaguePaths[league];
  // const ver: string = leagueApiVersion[league] || "";
  // try {
  //   const req = await fetch(
  //     `https://pvpoke.com/data/rankings/${url}.json?${ver}`
  //   );
  //   const data = await req.json();

  // let ob = data.find((o: any) => o.speciesId === pokemonName);

  //const data = leaguePaths[league];

  let data: PVPOKE[] = Great;
  if (league === "Great") {
    data = Great;
  } else if (league === "Ultra") {
    data = Ultra;
  } else if (league === "Master") {
    data = Master;
  } else if (league === "Comet") {
    data = Comet;
  } else if (league === "Twilight") {
    data = Twilight;
  } else {
    data = Great;
  }

  const movedata = data.map((data) => {
    let name = data.speciesId;
    let moves = data.moveset;

    return {
      name,
      moves,
    };
  });

  return movedata;
};
