'use client'

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

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
}

export default function Home() {
  const [firstUserData, setFirstUserData] = useState<UserData | null>(null);
  const [secondUserData, setSecondUserData] = useState<UserData | null>(null);
  const form1 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      summonerName: "",
      tagLine: "",
    },
  })

  const form2 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      summonerName: "",
      tagLine: "",
    },
  })

  const onSubmitOne = (data: z.infer<typeof formSchema>) => {
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
        console.log(mes.message);
        setFirstUserData(mes.message);
        console.log(`https://ddragon-webp.lolmath.net/latest/img/profileicon//${mes.message.profileIconId}.webp`);
      });
  }

  const onSubmitTwo = (data: z.infer<typeof formSchema>) => {
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
        console.log(mes.message);
        setSecondUserData(mes.message);
        console.log(`https://ddragon-webp.lolmath.net/latest/img/profileicon//${mes.message.profileIconId}.webp`);
      });
  }

  return (
    <div className="flex flex-row w-full justify-around mt-20">
      <div className="w-full">
        <Form {...form1}>
          <form onSubmit={form1.handleSubmit(onSubmitOne)} className="space-y-8">
            <FormField 
              control={form1.control}
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
              control={form1.control}
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

        {firstUserData && <>
          <Card>
            <CardHeader className="flex flex-col items-center">
              <img src={`https://ddragon-webp.lolmath.net/latest/img/profileicon//${firstUserData.profileIconId}.webp`} alt="Profile Icon" width={100} height={100} />
              <CardTitle>{firstUserData.gameName}#{firstUserData.tagLine}</CardTitle>
              <CardDescription>Level: {firstUserData.summonerLevel}</CardDescription>
            </CardHeader>
          </Card>        
        </>}
      </div>
      <div className="w-full">
        <Form {...form2}>
          <form onSubmit={form2.handleSubmit(onSubmitTwo)} className="space-y-8">
            <FormField 
              control={form2.control}
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
              control={form2.control}
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
        {secondUserData && <>
          <Card>
            <CardHeader className="flex flex-col items-center justify-center">
              <img src={`https://ddragon-webp.lolmath.net/latest/img/profileicon//${secondUserData.profileIconId}.webp`} alt="Profile Icon" width={100} height={100} />
              <CardTitle>{secondUserData.gameName}#{secondUserData.tagLine}</CardTitle>
              <CardDescription>Level: {secondUserData.summonerLevel}</CardDescription>
            </CardHeader>
          </Card>
        </>}
      </div>
    </div>
  );
}
