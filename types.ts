export type rankInfo = {
    leagueId: string;
    queueType: string;
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;
}

export type champInfo = {
    championId: number;
    championLevel: number;
    championPoints: number;
    championName?: string;
}

export interface UserData {
  gameName: string;
  tagLine: string;
  summonerLevel: number;
  profileIconId: number;
  puuid: string;
  region: string;
  rank: Array<rankInfo>;
  topChamps: Array<champInfo>;
}