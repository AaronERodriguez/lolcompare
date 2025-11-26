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
import NavBar from "./NavBar";
import Comparison from "./Comparison";

export default function Home() {

  

  return (
    <div className="flex flex-col gap-4">
      <NavBar />
      <Comparison />
    </div>
  );
}
