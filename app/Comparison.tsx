import React, { useState } from 'react'
import SummonerContainer from './SummonerContainer'
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserData } from '@/types';

type Props = {}

const formSchema =  z.object({
  summonerName: z.string().min(1, "Summoner name is required"),
  tagLine: z.string().min(1, "Tag line is required"),
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
    <div className="flex flex-row w-full justify-around">
        <SummonerContainer userData={userOneData} disabled={disabledOne} noUserFound={noUserOneFound} onSubmit={onOneSubmit} form={formOne} />
        <SummonerContainer userData={userTwoData} disabled={disabledTwo} noUserFound={noUserTwoFound} onSubmit={onTwoSubmit} form={formTwo} />
    </div>
  )
}

export default Comparison