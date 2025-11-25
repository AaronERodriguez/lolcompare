import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import z, { set } from 'zod';

type Props = {}

type rankInfo = {
    leagueId: string;
    queueType: string;
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;
}

type champInfo = {
    championId: number;
    championLevel: number;
    championPoints: number;
    championName?: string;
}

const formSchema = z.object({
  summonerName: z.string().min(1, "Summoner name is required"),
  tagLine: z.string().min(1, "Tag line is required"),
})

interface UserData {
  gameName: string;
  tagLine: string;
  summonerLevel: number;
  profileIconId: number;
  puuid: string;
  region: string;
  rank: Array<rankInfo>;
  topChamps: Array<champInfo>;
}

function SummonerContainer({}: Props) {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [noUserFound, setNoUserFound] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            summonerName: "",
            tagLine: "",
        },
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setDisabled(true);
        fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            summonerName: data.summonerName,
            tagLine: data.tagLine,
          }),
        })
        .then(response => response.json())
        .then(mes => {
            if (mes.message.gameName == undefined) {
                console.log("No user found");
                setNoUserFound(true);
                setDisabled(false);
                return;
            }
            setNoUserFound(false);
            setUserData(mes.message);
            setDisabled(false);
        })
    }
    return (
    <div className="w-full">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
            control={form.control}
            name="summonerName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Summoner Name</FormLabel>
                <FormControl>
                    <Input placeholder="Summoner Name" {...field} />
                </FormControl>
                <FormDescription>Enter your League of Legends summoner name.</FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField 
            control={form.control}
            name="tagLine"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Tag Line</FormLabel>
                <FormControl>
                    <Input placeholder="Tag Line" {...field} />
                </FormControl>
                <FormDescription>Enter your League of Legends tag line.</FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit" disabled={disabled}>Submit</Button>
        </form>
        </Form>
        {noUserFound && <p className="text-red-500 mt-4">No user found. Please check the summoner name and tag line.</p>}
        {userData && <>
        <Card className='pt-0'>
            <CardHeader className="flex flex-col items-center bg-secondary m-0 p-4 rounded-t-xl">
            <img src={`https://ddragon-webp.lolmath.net/latest/img/profileicon//${userData.profileIconId}.webp`} alt="Profile Icon" width={100} height={100} />
            <CardTitle>{userData.gameName}#{userData.tagLine}</CardTitle>
            <CardDescription className='text-center'>Level: {userData.summonerLevel}<br />Region: {userData.region}</CardDescription>
            </CardHeader>
            <CardContent>
                {userData.rank.length === 0 ? (
                    <p>Unranked</p>
                ) : (
                    userData.rank.map((rankInfo: rankInfo) => (
                        <div key={rankInfo.leagueId} className="mb-4">
                            <h3 className="text-lg font-semibold">{rankInfo.queueType.replace('_', ' ')} <img src={`./images/rank/${rankInfo.tier.toLowerCase()}.png`} className='size-12 inline'/></h3>
                            <p>Rank: {rankInfo.tier} {rankInfo.rank}</p>
                            <p>LP: {rankInfo.leaguePoints}</p>
                            <p>Wins: {rankInfo.wins} | Losses: {rankInfo.losses}</p>
                            <p>Win Rate: {((rankInfo.wins / (rankInfo.wins + rankInfo.losses)) * 100).toFixed(2)}%</p>
                        </div>
                    ))
                )}
                {userData.topChamps.length > 0 && <>
                <h2 className="text-xl font-bold mt-4 mb-2">Top Champions</h2>
                {userData.topChamps.map((champ: champInfo) => (
                    <div key={champ.championId} className="mb-2">
                        <p>{champ.championName}: Level {champ.championLevel}, Points {champ.championPoints}</p>
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