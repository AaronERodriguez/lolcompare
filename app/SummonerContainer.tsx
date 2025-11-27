import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, convertRankToNumber, Division, Tier } from '@/lib/utils';
import { champInfo, rankInfo, UserData } from '@/types';

type Props = {
    userData: UserData | null;
    noUserFound: boolean;
    otherUserData?: UserData | null;
}

function SummonerContainer({ userData, noUserFound, otherUserData }: Props) {

    return (
    <div className="w-full">  
        {noUserFound ? <p className="text-red-500 mt-4 w-full">No user found. Please check the summoner name and tag line.</p> : null}
        {userData && <>
        <Card className='pt-0 gap-0'>
            <CardHeader className={cn("flex flex-col items-center m-0 p-4 rounded-t-xl", 
                otherUserData ? otherUserData.summonerLevel > userData.summonerLevel ? "bg-red-500/10" : otherUserData.summonerLevel < userData.summonerLevel ? "bg-green-500/10" : "bg-yellow-500/10" : "bg-primary/10"
            )}>
            <img src={`https://ddragon-webp.lolmath.net/latest/img/profileicon/${userData.profileIconId}.webp`} alt="Profile Icon" width={100} height={100} />
            <CardTitle>{userData.gameName}#{userData.tagLine}</CardTitle>
            <CardDescription className='text-center'>Level: {userData.summonerLevel}<br />Region: {userData.region}</CardDescription>
            </CardHeader>
            <CardContent className='p-0 m-0 flex flex-col'>
                {userData.rank.length === 0 ? (
                    <p>Unranked</p>
                ) : (
                    userData.rank.map((rankInfo: rankInfo) => (
                        <div key={rankInfo.leagueId} className={cn("", otherUserData && otherUserData.rank.length > 0 ? (
                            otherUserData.rank.find(r => r.queueType === rankInfo.queueType) ? (
                                convertRankToNumber(rankInfo.tier as Tier, rankInfo.rank as Division, rankInfo.leaguePoints) > convertRankToNumber(otherUserData.rank.find(r => r.queueType === rankInfo.queueType)!.tier as Tier, otherUserData.rank.find(r => r.queueType === rankInfo.queueType)!.rank as Division, otherUserData.rank.find(r => r.queueType === rankInfo.queueType)!.leaguePoints) ? "bg-green-500/10 p-2 rounded-md" : convertRankToNumber(otherUserData.rank.find(r => r.queueType === rankInfo.queueType)!.tier as Tier, otherUserData.rank.find(r => r.queueType === rankInfo.queueType)!.rank as Division, otherUserData.rank.find(r => r.queueType === rankInfo.queueType)!.leaguePoints) > convertRankToNumber(rankInfo.tier as Tier, rankInfo.rank as Division, rankInfo.leaguePoints) ? "bg-red-500/10 p-2 rounded-md" : "bg-yellow-500/10 p-2 rounded-md"
                            ) : ""
                        ) : "")}>
                            <h3 className="text-lg font-semibold">{rankInfo.queueType.replace('_', ' ')}</h3>
                            <img src={`./images/rank/${rankInfo.tier.toLowerCase()}.png`} className='size-24 mx-auto block'/>
                            <p className='text-center text-lg font-semibold'>{rankInfo.tier} {rankInfo.rank} <span className='font-normal'>{rankInfo.leaguePoints} LP</span></p>
                            <p className='text-center'>Wins: {rankInfo.wins} | Losses: {rankInfo.losses}</p>
                            <p className='text-center'>Win Rate: {((rankInfo.wins / (rankInfo.wins + rankInfo.losses)) * 100).toFixed(2)}%</p>
                        </div>
                    ))
                )}
                {userData.topChamps.length > 0 && <>
                <h2 className="text-xl font-bold mt-4 mb-2">Top Champions</h2>
                {userData.topChamps.map((champ: champInfo, index : number) => (
                    <div key={champ.championId} className={cn("pb-2", otherUserData && otherUserData.topChamps.length > 0 ? (
                        otherUserData.topChamps[index] ? (
                            champ.championPoints > otherUserData.topChamps[index].championPoints ? "bg-green-500/10 p-2 rounded-md" : champ.championPoints < otherUserData.topChamps[index].championPoints ? "bg-red-500/10 p-2 rounded-md" : "bg-yellow-500/10 p-2 rounded-md"
                        ) : ""
                    ) : "")}>
                        <p className=''><img src={`./images/champions/${champ.championId}.png`} className='size-12 inline' /> {champ.championName}: Level {champ.championLevel} / {champ.championPoints} Points</p>
                    </div>
                ))}
                </>}
            </CardContent>
        </Card>        
        </>}
    </div>
  )
}

export default SummonerContainer