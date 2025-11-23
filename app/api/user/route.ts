import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';
 
type ResponseData = {
  message: string
}
 
export async function POST(request: Request) {
  const body = await request.json();
  const summonerName = body.summonerName;
  const tagLine = body.tagLine;

    const response = await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagLine}`, {
    method: "GET",
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY || "",
    },
    });
    const data = await response.json();
    const puuid = data.puuid;
    const responsetwo = await fetch(`https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`, {
    method: "GET",
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY || "",
    }
    });
    const datatwo = await responsetwo.json();
    const regionResposne = await fetch(`https://americas.api.riotgames.com/riot/account/v1/region/by-game/lol/by-puuid/${puuid}`, {
    method: "GET",
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY || "",
    }
    });
    const regionData = await regionResposne.json();
    const result = {
        gameName : data.gameName,
        tagLine : data.tagLine,
        profileIconId : datatwo.profileIconId,
        summonerLevel : datatwo.summonerLevel,
        puuid : puuid,
        region: regionData.region
    }
    console.log(result);

    return NextResponse.json({ message: result});
}