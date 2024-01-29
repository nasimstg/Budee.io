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
import ReactCustomizableProgressbar from "@/lib/ReactCustomizableProgressbar";
import { Calendar } from "@/components/ui/calendar"
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

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
       <Card className="w-full">
        <CardHeader>
            <CardTitle>{data?.name} <Badge>{data?.email}</Badge></CardTitle>
            <CardDescription className="flex gap-4">Budget:&nbsp;{data?.totalBudget}&nbsp;&nbsp;Trend:&nbsp;<span className="text-green-400">{data?.percent > 100 ? "Over":"Under"}-&nbsp;{data?.percent}</span>
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-row justify-start items-center gap-8">
                <div className="w-[215px]">
                <ReactCustomizableProgressbar
                      radius={100}
                      progress={parseInt(data?.spent/data?.totalBudget * 100)}
                      pointerRadius={8}
                      pointerStrokeWidth={4}
                      steps={100}>
                        <div className="indicator">
                          <div>{parseInt(data?.spent/data?.totalBudget * 100)}%</div>
                      </div>
                        </ReactCustomizableProgressbar>
                </div>
                <div className="flex flex-col gap-2">
                  <Calendar data={data}/>
                </div>
            </div>
        </CardContent>
       </Card>
    </>
  )
}
