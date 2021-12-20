import cheerio, { Element } from "cheerio";
import { PlayerStats, SquadStats } from "../../types";

export const fetchSquadData = async (faction: string): Promise<SquadStats> => {
  const req = await fetch("https://silph.gg/faction/" + faction);
  const data: string = await req.text();
  const $ = cheerio.load(data);

  const SquadElements: Element[] = $(
    "#teamDetails > div.memberList> .member"
  ).toArray();

  const playerStats: PlayerStats[] = SquadElements.map((el: Element) => {
    const name: string = $(el).find(" .name p").text() || "";
    const score: string = $(el)
      .find(" .stats .battlesWon")
      .text()
      .replace("Wins", "");
    const matches: string = $(el)
      .find(" .stats .matchesPlayed")
      .text()
      .replace("Matches", "");
    const role: string = $(el)
      .find(" .specialty h6")
      .text()
      .replace("Specialist", "");
    const totalBattles: number = parseInt(matches) * 3;

    return { name, score, matches, role, totalBattles };
  });

  const logo: string =
    $(
      "#content > div.teamView.row-fluid.dark > div.container.text-left > div.row > .teamWrapper > .teamHeader > .emblemWrapper > img "
    ).attr("src") || "";
  const teamName: string =
    $(
      "#content > div.teamView.row-fluid.dark > div.container.text-left > div.row > .teamWrapper > .teamHeader > .bottom > .teamDetails > h2 "
    ).html() || "";
  const winLoss: string =
    $(
      "#content > div.teamView.row-fluid.dark > div.container.text-left > div.row > .teamWrapper > .highlights > .highlight:nth-child(3) > span"
    ).html() || "";

  const squadStats: SquadStats = {
    teamName,
    logo,
    winLoss,
    playerStats,
  };

  return squadStats;
};
