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
  moves?: string[];
}

export interface TrainerData {
  playerName: string;
  avatar: string;
  winRate: number;
}

export interface TeamStats {
  squadName: string;
  logo: string;
  winLoss: string;
}
export interface PlayerStats {
  name: string[];
  role: string[];
  score: string[];
  matches: string[];
  totalBattles: number[];
}
export interface SquadData {
  teamStats: TeamStats[];
  playerStats: PlayerStats[];
}
