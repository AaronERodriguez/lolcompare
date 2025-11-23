import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';
 
type ResponseData = {
  message: string
}
 
export async function GET(request: Request) {
    const response = await fetch("https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/SleepyLayla/1219", {
    method: "GET",
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY || "",
    },
    });
    const data = await response.json();
    const responsetwo = await fetch('https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/TuZVfkL3LDAR-2KMW4-pZrNHzqgRqsPGh1OohEziyl0eKWr97ttr8hsql1dAt2OSD2zeLYdo0uvvMQ', {
    method: "GET",
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY || "",
    }
    });
    const datatwo = await responsetwo.json();

    return NextResponse.json({ message: datatwo});
}