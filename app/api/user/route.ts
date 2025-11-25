import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';

type ResponseData = {
  message: string
}

const championJSON = await fetch('http://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion.json');
const championData = await championJSON.json();

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
    const dataThree = await fetch(`https://la1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`, {
      method: "GET", headers:{
        "X-Riot-Token": process.env.RIOT_API_KEY || "",
      }
    });
    const rankData = await dataThree.json();
    const champData = await fetch(`https://la1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=5`, {
      method: "GET", headers:{
        "X-Riot-Token": process.env.RIOT_API_KEY || "",
      }
    })
    const topChamps = await champData.json();
    //Find the champion names from championData
    for (let i = 0; i < topChamps.length; i++) {
      const champId = topChamps[i].championId;
      for (const key in championData.data) {
        if (championData.data[key].key == champId.toString()) {
          topChamps[i].championName = championData.data[key].name;
        }
      }
    }
    const result = {
        gameName : data.gameName,
        tagLine : data.tagLine,
        profileIconId : datatwo.profileIconId,
        summonerLevel : datatwo.summonerLevel,
        puuid : puuid,
        region: regionData.region,
        rank: rankData,
        topChamps: topChamps,
    }
    console.log(result);

    return NextResponse.json({ message: result});
}