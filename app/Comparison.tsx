import React, { useState } from 'react'
import SummonerContainer from './SummonerContainer'
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserData } from '@/types';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Props = {}

const formSchema =  z.object({
  summonerName: z.string().min(1, "Summoner name is required"),
  tagLine: z.string().min(1, "Tag line is required"),
  region: z.string().min(1, "Region is required"),
})

function Comparison({}: Props) {

    const [userOneData, setUserOneData] = useState<UserData | null>(null);
    const [disabledOne, setDisabledOne] = useState<boolean>(false);
    const [noUserOneFound, setNoUserOneFound] = useState<boolean>(false);
    const [userTwoData, setUserTwoData] = useState<UserData | null>(null);
    const [disabledTwo, setDisabledTwo] = useState<boolean>(false);
    const [noUserTwoFound, setNoUserTwoFound] = useState<boolean>(false);
    
        const formOne = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                summonerName: "",
                tagLine: "",
                region: ""
            },
        })

        const formTwo = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                summonerName: "",
                tagLine: "",
            },
        })
    
        

        const onOneSubmit = (data: z.infer<typeof formSchema>) => {
            setDisabledOne(true);
            fetch('/api/user', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                summonerName: data.summonerName,
                tagLine: data.tagLine,
                region: data.region,
              }),
            })
            .then(response => response.json())
            .then(mes => {
                if (mes.message.gameName == undefined) {
                    console.log("No user found");
                    setNoUserOneFound(true);
                    setDisabledOne(false);
                    return;
                }
                setNoUserOneFound(false);
                setUserOneData(mes.message);
                setDisabledOne(false);
            })
        }

        const onTwoSubmit = (data: z.infer<typeof formSchema>) => {
            setDisabledTwo(true);
            fetch('/api/user', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                summonerName: data.summonerName,
                tagLine: data.tagLine,
                region: data.region,
              }),
            })
            .then(response => response.json())
            .then(mes => {
                if (mes.message.gameName == undefined) {
                    console.log("No user found");
                    setNoUserTwoFound(true);
                    setDisabledTwo(false);
                    return;
                }
                setNoUserTwoFound(false);
                setUserTwoData(mes.message);
                setDisabledTwo(false);
            })
        }

  return (
    <div className='flex flex-col'>
        <div className='w-full flex flex-row gap-2 p-1'>
            <Form {...formOne}>
            <form onSubmit={formOne.handleSubmit(onOneSubmit)} className="space-y-8 w-full">
                <FormField
                control={formOne.control}
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
                control={formOne.control}
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
                <FormField 
                control={formOne.control}
                name="region"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>
                        Region
                        <FormControl>
                        <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Region" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="NA1">NA</SelectItem>
                                <SelectItem value="EUW1">EUW</SelectItem>
                                <SelectItem value="EUN1">EUNE</SelectItem>
                                <SelectItem value="LA1">LAN</SelectItem>
                                <SelectItem value="LA2">LAS</SelectItem>
                                <SelectItem value="BR1">BR</SelectItem>
                                <SelectItem value="JP1">JP</SelectItem>
                                <SelectItem value="KR">KR</SelectItem>
                                <SelectItem value="OC1">OCE</SelectItem>
                                <SelectItem value="RU">RU</SelectItem>
                                <SelectItem value="TR1">TR</SelectItem>
                                <SelectItem value="ME1">ME</SelectItem>
                                <SelectItem value="SEA">SEA</SelectItem>
                                <SelectItem value="TW2">TW</SelectItem>
                                <SelectItem value="VN2">VN</SelectItem>
                                <SelectItem value="SG2">SG</SelectItem>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    </FormLabel>
                    
                    <FormDescription>Enter your League of Legends region.</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" disabled={disabledOne}>Submit</Button>
            </form>
            </Form>
            <Form {...formTwo}>
            <form onSubmit={formTwo.handleSubmit(onTwoSubmit)} className="space-y-8 w-full">
                <FormField
                control={formTwo.control}
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
                control={formTwo.control}
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
                <FormField 
                control={formTwo.control}
                name="region"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>
                        Region
                        <FormControl>
                        <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Region" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="NA1">NA</SelectItem>
                                <SelectItem value="EUW1">EUW</SelectItem>
                                <SelectItem value="EUN1">EUNE</SelectItem>
                                <SelectItem value="LA1">LAN</SelectItem>
                                <SelectItem value="LA2">LAS</SelectItem>
                                <SelectItem value="BR1">BR</SelectItem>
                                <SelectItem value="JP1">JP</SelectItem>
                                <SelectItem value="KR">KR</SelectItem>
                                <SelectItem value="OC1">OCE</SelectItem>
                                <SelectItem value="RU">RU</SelectItem>
                                <SelectItem value="TR1">TR</SelectItem>
                                <SelectItem value="ME1">ME</SelectItem>
                                <SelectItem value="SEA">SEA</SelectItem>
                                <SelectItem value="TW2">TW</SelectItem>
                                <SelectItem value="VN2">VN</SelectItem>
                                <SelectItem value="SG2">SG</SelectItem>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    </FormLabel>
                    
                    <FormDescription>Enter your League of Legends region.</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" disabled={disabledTwo}>Submit</Button>
            </form>
            </Form>
        </div>
        <div className="flex flex-row w-full justify-around">
            <SummonerContainer userData={userOneData} noUserFound={noUserOneFound} otherUserData={userTwoData}/>
            <SummonerContainer userData={userTwoData}  noUserFound={noUserTwoFound} otherUserData={userOneData}/>
        </div>
    </div>
  )
}

export default Comparison