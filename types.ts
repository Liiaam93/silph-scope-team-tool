export interface Tournament {
  league: string;
  bout: string;
  role: string;
  wins: number;
  losses: number;
  pokemon: Pokemon[];
}

export interface Pokemon {
  name: string;
  image: string;
  moves: string[];
}

export interface TrainerData {
  playerName: string;
  avatar: string;
  winRate: number;
}

export interface PlayerStats {
  name: string;
  avatar: string;
  role: string;
  score: string;
  matches: string;
  totalBattles: number;
}
export interface SquadStats {
  teamName: string;
  logo: string;
  winLoss: string;
  playerStats: PlayerStats[];
}
export interface PokemonArray {
  name: string;
  sprite: string;
  count: number;
  moves: string[];
}
export interface Result {
  tournaments: Tournament[];
  roster: PokemonArray[];
}
export interface PokemonStats {
  name: string;
  moveset: string[];
  score: number;
  counters: string[];
  matchups: string[];
  fastMoves: string[];
  chargedMoves: string[];
}

export interface Result {
  tournaments: Tournament[];
  roster: PokemonArray[];
  faction?: string;
}

interface Matchups {
  opponent?: string;
  rating?: number;
  moveId?: string;
}
interface Moves {
  fastMoves: Matchups[];
  chargedMoves: Matchups[];
}
export interface PVPOKE {
  speciesId: string;
  speciesName: string;
  rating: number;
  matchups: Matchups[];
  counters: Matchups[];
  moves: Moves;
  moveset: string[];
  score: number;
  scores: number[];
}
