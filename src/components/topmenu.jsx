"use client"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Dialogue from "./dialogue"
import { DoubleArrowDownIcon } from "@radix-ui/react-icons"

export default function TopMenu({data}) {
  return ( 
  <section className="flex flex-row justify-between mr-4  px-4 py-2">
        <ul className="flex flex-row rounded gap-2">
          {
            data?.map( (e, index)=>{
              return (
                <li className="" key={index} style={e.active}>
                  <Dialogue title={e.title} data = {e} />
                </li>
              )
            })
          }
          <li>

          </li>
        </ul>
        <Popover>
          <PopoverTrigger>
          <DoubleArrowDownIcon />
          </PopoverTrigger>
          <PopoverContent>
            <ul>
              <li>Change History</li>
            </ul>
          </PopoverContent>
        </Popover>

      </section>
  )
}
