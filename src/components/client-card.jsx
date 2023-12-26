"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend);

export const cdata = {
    labels: ['Budget', 'Spending'],
    datasets: [
      {
        label: 'Vlaue: ',
        data: [1095, 354],
        backgroundColor: [
          'rgba(0, 255, 0, 0.6)',
          'rgba(255, 0, 0, 0.6)',
        ],
        borderColor: [
          'rgba(0, 255, 0, 1)',
          'rgba(255, 0, 0, 1)',
        ],
        borderWidth: 3,
      },
    ],
  };

export default function ClientCard({data}) {
  return (
    <> 
       <Card>
        <CardHeader>
            <CardTitle>{data.title}</CardTitle>
            <CardDescription>{data.budget} <span></span> {data.trend} </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-row justify-center items-center gap-8">
                <div className="w-[225px]">
                    <Doughnut data={cdata}/>
                </div>
                <div className="flex flex-col gap-2">
                    <div><CardDescription>Start Date:</CardDescription> 10 Dec, 2023</div>
                <div><CardDescription>Today:</CardDescription> 30 Dec, 2023</div>
                    <div><CardDescription>End Date:</CardDescription> 30 Dec, 2023</div>
                </div>
            </div>
        </CardContent>
       </Card>
    </>
  )
}
