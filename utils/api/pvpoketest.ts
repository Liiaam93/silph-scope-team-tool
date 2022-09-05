export interface PokemonStats {
  name: string;
  moveset: string[];
  score: number;
  counters: string[];
  matchups: string[];
  fastMoves: string[];
  chargedMoves: string[];
}
type League = "Great" | "Twilight" | "Master" | "Ultra" | "Comet";
// | "Celestial"
// | "Primeval"
// | "Sorcerous"
// | "Timeless";

const leaguePaths: Record<League, string> = {
  Great: "all/overall/rankings-1500",
  Twilight: "twilightfactions/overall/rankings-1500",
  Master: "all/overall/rankings-10000",
  Ultra: "all/overall/rankings-2500",
  Comet: "factions/overall/rankings-1500",
};

const leagueApiVersion: Partial<Record<League, string>> = {
  Twilight: "v=1.24.5.9",
};

export const getMoveData = async (league: League): Promise<PokemonStats[]> => {
  const url: string = leaguePaths[league];
  const ver: string = leagueApiVersion[league] || "";

  try {
    const req = await fetch(
      `https://pvpoke.com/data/rankings/${url}.json?${ver}`
    );

    const data = await req.json();

    // let ob = data.find((o: any) => o.speciesId === pokemonName);
    return data;
  } catch (err: any) {
    console.log(err.message);
    return [];
  }
};
