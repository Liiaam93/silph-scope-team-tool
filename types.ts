export interface Team {
  name: string;
  wins: number;
  losses: number;
  pokemon: Pokemon[];
}

export interface Pokemon {
  name: string;
  image: string;
  moves: string[];
}
