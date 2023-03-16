import * as puppeteer from "puppeteer";
import cheerio, { Element } from "cheerio";

async function getSilph(player: string) {
  const url = "https://thesilphroad.com/card/u/" + player;

  // Launch a headless browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the website
  await page.goto(url, { waitUntil: "networkidle0" });

  // Wait for the website to load fully
  await page.waitForSelector("body");

  // Get the HTML of the page
  const html = await page.content();

  // Use Cheerio to extract data from the HTML
  const $ = cheerio.load(html);

  const tournamentElements: Element[] = $(
    "#networkAndAchievements > div.arenaHistory.cardBlock > div.content > div.display.bouts > div.tournament"
  ).toArray();

  const tournaments = tournamentElements.map((el: Element) => {
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
    const pokemon = $(el)
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
          .replace("Porygon-Z", "Porygon_Z")
          .replace(" (Average Size", "_Average");

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
        } else if (name === "Mega Charizard X") {
          name = "Charizard_Mega_X";
        } else if (name === "Mega Charizard Y") {
          name = "Charizard_Mega_Y";
        } else if (name.includes("Mega ")) {
          let len = name.length;
          (name = name.slice(5)), len;
          name = name + "_Mega";
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

  // Close the browser
  await browser.close();

  // Return the scraped data
  return { tournamentElements };
}
