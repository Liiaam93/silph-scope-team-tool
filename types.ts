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
