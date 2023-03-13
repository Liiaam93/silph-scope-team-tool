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
          .replace(/\s\(.*?\)/g, "")
          .replace("Porygon-Z", "Porygon_Z")
          .replace("Galarian ", "")
          .replace("Alolan ", "")
          .replace("Hisuian ", "")
          .replace("Armored ", "")
          .replace("Darmanitan", "Darmanitan_Standard")
          .replace("Ho-Oh", "Ho_oh")
          .replace("Tapu Fini", "Tapu_Fini")
          .replace("Mega ", "")
          .replace("Charizard X", "Charizard_Mega_X")
          .replace("Charizard Y", "Charizard_Mega_Y")
          .replace(/\s/g, "_");

        const image: string = $(el).find("img").attr("src") || "";
        const shadow = $(el).find(".shadow").attr("src") || "";
        const isShadow = shadow !== "";
        if (isShadow) {
          name += "_Shadow";
        }

        return { name, image, moves: [], tLeague: league, isShadow };
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
