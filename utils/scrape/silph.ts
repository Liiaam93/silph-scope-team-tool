import cheerio, { Element } from "cheerio";
import { Pokemon, Tournament, PokemonArray, MoveData } from "../../types";
import * as lodash from "lodash";
import { getMoveData } from "../api/pvpoke";

interface Result {
  tournaments: Tournament[];
  roster: PokemonArray[];
}

export const fetchUserTournaments = async (player: string): Promise<Result> => {
  const req = await fetch("https://thesilphroad.com/card/u/" + player);
  const data: string = await req.text();
  const $ = cheerio.load(data);

  const tournamentElements: Element[] = $(
    "#networkAndAchievements > div.arenaHistory.cardBlock > div.content > div.display.bouts > div.tournament"
  ).toArray();

  const tournaments: Tournament[] = tournamentElements.map((el: Element) => {
    const league: string = $(el)
      .find(".cupType")
      .text()
      .trim()
      .replace("Open", "")
      // .replace("v1", "")
      // .replace("V2", "")
      // .replace("V3", "")
      .trim();

    const bout: string = $(el).find(".tourneyName").text().trim();
    const role: string = $(el).find(".role").text();
    const wins: number = parseInt($(el).find(".win h3").text());
    const losses: number = 3 - wins;
    const pokemon: Pokemon[] = $(el)
      .find(".pokemon")
      .toArray()
      .map((el: Element) => {
        let name: string = ($(el).attr("title") || "")
          .replace(" (Altered Forme)", "_Altered")
          .replace(" (Defense Forme)", "_Defense")
          .replace(" (Normal)", "")
          .replace(" (Trash Cloak)", "_Trash")
          .replace(" (Sandy Cloak)", "_Sandy")
          .replace(" (Plant Cloak)", "_Plant")
          .replace(" (Midnight)", "_Midnight")
          .replace(" (Midday)", "_Midday")
          .replace(" (East Sea)", "")
          .replace(" (West Sea)", "")
          .replace(" (Hero of Many Battles)", "_Hero")
          .replace(" (Therian Forme)", "_Therian")
          .replace(" (Origin Forme)", "_Origin")
          .replace("Porygon-Z", "Porygon_Z");

        if (name.includes("Galarian")) {
          let len = name.length;
          name = name.slice(9, len);
          name = name + "_Galarian";
        } else if (name.includes("Alolan")) {
          let len = name.length;
          name = name.slice(7, len);
          name = name + "_Alolan";
        } else if (name.includes("Hisuian")) {
          let len = name.length;
          name = name.slice(8, len);
          name = name + "_Hisuian";
        } else if (name.includes("Armored")) {
          let len = name.length;
          name = name.slice(8, len);
          name = name + "_Armored";
        } else if (name === "Darmanitan") {
          name += "_Standard";
        } else if (name === "Ho-Oh") {
          name = "Ho_oh";
        } else if (name === "Tapu Fini") {
          name = "Tapu_Fini";
        }

        const image: string = $(el).find("img").attr("src") || "";
        const shadow = $(el).find(".shadow").attr("src") || "";
        if (shadow !== "") {
          name += "_Shadow";
        }
        const moves: string[] = [];
        const tLeague = league;
        let isShadow: boolean = false;
        name.includes("Shadow") ? (isShadow = true) : (isShadow = false);

        return { name, image, moves, tLeague, isShadow };
      });
    return {
      league,
      bout,
      role,
      wins,
      losses,
      pokemon,
    };
  });

  for (let i = 0; i < tournaments.length; i++) {
    let league: string = tournaments[i].league || "Great";
    let moves: MoveData[] = getMoveData(league);
    for (let k = 0; k < tournaments[i].pokemon.length; k++) {
      const moveArr: MoveData = Object.values(moves).find(
        (o: MoveData) => o.name === tournaments[i].pokemon[k].name.toLowerCase()
      ) || { name: "", moves: [] };
      moveArr.moves = tournaments[i].pokemon[k].moves = moveArr.moves;
    }
  }

  let pokemonArrays: Array<Pokemon[]> = [];
  for (let i = 0; i < tournaments.length; i++) {
    pokemonArrays.push(tournaments[i].pokemon);
  }
  const mons: Array<Pokemon> = [];

  for (let i = 0; i < pokemonArrays.length; i++) {
    for (let k = 0; k < pokemonArrays[i].length; k++) {
      mons.push(pokemonArrays[i][k]);
    }
  }

  let pokemonArray: PokemonArray[] = [];
  for (let i = 0; i < mons.length; i++) {
    let poke = {
      name: mons[i].name,
      sprite: mons[i].image,
      moves: mons[i].moves,
      count: 0,
      tLeague: mons[i].tLeague,
      isShadow: mons[i].isShadow,
    };
    pokemonArray.push(poke);
  }

  interface Counts {
    [pokemonName: string]: number;
  }
  const counts: Counts = lodash.countBy(pokemonArray, "name");

  const pokemonWithCount = Object.keys(counts).map((pokemonName) => ({
    ...pokemonArray.find((pokemon) => pokemon.name === pokemonName),
    count: counts[pokemonName],
  }));

  const roster: any = Object.values(pokemonWithCount).sort(
    (b, a) => a.count - b.count
  );

  const result: Result = {
    tournaments,
    roster,
  };
  return result;
};
