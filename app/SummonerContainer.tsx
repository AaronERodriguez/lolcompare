import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import z, { set } from 'zod';

type Props = {}

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
  rank: Array<object>;
}

function SummonerContainer({}: Props) {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [noUserFound, setNoUserFound] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            summonerName: "",
            tagLine: "",
        },
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
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
                return;
            }
            setNoUserFound(false);
            setUserData(mes.message);
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
            <Button type="submit">Submit</Button>
        </form>
        </Form>
        {noUserFound && <p className="text-red-500 mt-4">No user found. Please check the summoner name and tag line.</p>}
        {userData && <>
        <Card>
            <CardHeader className="flex flex-col items-center">
            <img src={`https://ddragon-webp.lolmath.net/latest/img/profileicon//${userData.profileIconId}.webp`} alt="Profile Icon" width={100} height={100} />
            <CardTitle>{userData.gameName}#{userData.tagLine}</CardTitle>
            <CardDescription className='text-center'>Level: {userData.summonerLevel}<br />Region: {userData.region}</CardDescription>
            </CardHeader>
            <CardContent>
                {userData.rank.length === 0 ? (
                    <p>Unranked</p>
                ) : (
                    userData.rank.map((rankInfo: any) => (
                        <div key={rankInfo.leagueId} className="mb-4">
                            <h3 className="text-lg font-semibold">{rankInfo.queueType.replace('_', ' ')}</h3>
                            <p>Tier: {rankInfo.tier} {rankInfo.rank}</p>
                            <p>LP: {rankInfo.leaguePoints}</p>
                            <p>Wins: {rankInfo.wins} | Losses: {rankInfo.losses}</p>
                            <p>Win Rate: {((rankInfo.wins / (rankInfo.wins + rankInfo.losses)) * 100).toFixed(2)}%</p>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>        
        </>}
    </div>
  )
}

export default SummonerContainer