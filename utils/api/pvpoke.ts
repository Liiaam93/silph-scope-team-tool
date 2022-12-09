import { PVPOKE, MoveData } from "../../types";
import { Great } from "../../model/PVPoke/Great";
import { Ultra } from "../../model/PVPoke/Ultra";
import { Master } from "../../model/PVPoke/Master";
import { Comet } from "../../model/PVPoke/Comet";
import { Twilight } from "../../model/PVPoke/Twilight";
import { Cave } from "../../model/PVPoke/Cave";
import { Fusion } from "../../model/PVPoke/Fusion";
import { Sorcerous } from "../../model/PVPoke/Sorcerous";
import { Celestial } from "../../model/PVPoke/Celestial";
import { Primeval } from "../../model/PVPoke/Primeval";
import { Timeless } from "../../model/PVPoke/Timeless";
import { Ember } from "../../model/PVPoke/Ember";
import { Vanguard } from "../../model/PVPoke/Vanguard";

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
  Cave: Cave,
  Fusion: Fusion,
  Primeval: Primeval,
  Timeless: Timeless,
  Sorcerous: Sorcerous,
  Celestial: Celestial,
  Ember: Ember,
  Vanguard: Vanguard,
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
  } else if (league === "Ultra" || league.includes("Ultra")) {
    data = Ultra;
  } else if (league === "Master" || league.includes("Master")) {
    data = Master;
  } else if (league === "Comet" || league.includes("Comet")) {
    data = Comet;
  } else if (league === "Cave" || league.includes("Cave")) {
    data = Cave;
  } else if (league === "Fusion" || league.includes("Fusion")) {
    data = Fusion;
  } else if (league === "Twilight") {
    data = Twilight;
  } else if (league === "Sorcerous" || league.includes("Sorcerous")) {
    data = Sorcerous;
  } else if (league === "Celestial" || league.includes("Celestial")) {
    data = Celestial;
  } else if (league === "Timeless" || league.includes("Timeless")) {
    data = Timeless;
  } else if (league === "Primeval" || league.includes("Primeval")) {
    data = Primeval;
  } else if (league === "Ember" || league.includes("Ember")) {
    data = Ember;
  } else if (league === "Vanguard" || league.includes("Vanguard")) {
    data = Vanguard;
  } else {
    data = Great;
  }

  const movedata: MoveData[] = data.map((data) => {
    let name: string = data.speciesId;
    let moves: string[] = data.moveset;

    return {
      name,
      moves,
    };
  });

  return movedata;
};
