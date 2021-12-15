import { atom } from "recoil";

export const leagueFilterState = atom({
  key: "leagueFilterState",
  default: "",
});
export const trainerNameState = atom({
  key: "trainerNameState",
  default: "",
});
export const factionNameState = atom({
  key: "factionNameState",
  default: "default",
});
