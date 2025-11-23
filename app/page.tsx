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
import SummonerContainer from "./SummonerContainer";

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

  return (
    <>
      <div className="flex flex-row w-full justify-around">
        <SummonerContainer />
        <SummonerContainer />
      </div>
    </>
  );
}
