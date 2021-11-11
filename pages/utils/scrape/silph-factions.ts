import cheerio, { Element } from "cheerio";
import { PlayerStats, TeamStats, SquadData } from "../../../types";

export const fetchSquadData = async (faction: string): Promise<SquadData> => {
  const req = await fetch("https://silph.gg/faction/" + faction);
  const data: string = await req.text();
  const $ = cheerio.load(data);

  const SquadElements: Element[] = $(
    "#content > div.teamView.row-fluid.dark > div.container.text-left > teamWrapper"
  ).toArray();

  const teamStats: TeamStats[] = SquadElements.map((el: Element) => {
    const logo: string =
      $(el).find(".teamHeader > .emblemWrapper > img ").attr("src") || "";
    const squadName: string = $(el)
      .find(".teamHeader > .bottom > .teamDetails > h2 ")
      .text();
    const winLoss: string = $(el)
      .find(".highlights > .highlight:nth-child(3) > span")
      .text();

    return { logo, squadName, winLoss };
  });

  const playerStats: PlayerStats[] = SquadElements.map((el: Element) => {
    const name: string[] =
      $("#teamDetails > div.memberList")
        .find(".member .name p")
        .toArray()
        .map((element) => $(element).text()) || "";

    let score: string[] = $("#teamDetails > div.memberList")
      .find(".member .stats .battlesWon")
      .toArray()
      .map((element) => $(element).text());

    for (let i = 0; i < 9; i++) {
      if (name[i] === "&nbsp;") {
        score.splice(i, 0, "NA");
      }
    }

    let matches: string[] =
      $("#teamDetails > div.memberList")
        .find(".member .stats .matchesPlayed")
        .toArray()
        .map((element) => $(element).text()) || "";

    for (let i = 0; i < 9; i++) {
      if (name[i] === "&nbsp;") {
        matches.splice(i, 0, "NA");
        name[i] = "N/A";
      }
    }

    const role: string[] =
      $("#teamDetails > div.memberList")
        .find(".member .specialty h6")
        .toArray()
        .map((element) => $(element).text()) || "";

    const totalBattles: number[] = matches.map((el) => parseInt(el) * 3);

    return { name, score, matches, role, totalBattles };
  });

  const squadData: SquadData = {
    teamStats: teamStats,
    playerStats: playerStats,
  };

  return squadData;
};
