import axios from "axios"; // read docs...
import cheerio, { Element } from "cheerio";
import { Pokemon, Tournament } from "../../../types";

export const fetchUserTournaments = async (
  player: string
): Promise<Tournament[]> => {
  const req = await fetch("https://thesilphroad.com/card/u/" + player);
  const data: string = await req.text();
  const $ = cheerio.load(data);

  const tournamentElements: Element[] = $(
    "#networkAndAchievements > div.arenaHistory.cardBlock > div.content > div.display.bouts > div.tournament"
  ).toArray();

  const tournaments: Tournament[] = tournamentElements.map((el: Element) => {
    const league: string = $(el).find(".cupType").text();
    const bout: string = $(el).find(".tourneyName").text();
    const role: string = $(el).find(".role").text();
    const wins: number = parseInt($(el).find(".win h3").text());
    const losses: number = 3 - wins;
    const pokemon: Pokemon[] = $(el)
      .find(".pokemon")
      .toArray()
      .map((el: Element) => {
        const name: string = $(el).attr("title") || "";
        const image: string = $(el).find("img").attr("src") || "";
        return { name, image };
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

  return tournaments;
};
