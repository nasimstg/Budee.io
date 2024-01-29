'use client'
import React from 'react'
import ClientCard from './client-card'
import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import Dialogue from './dialogue'


export default function Body({data}) {
  const [clients, setClients] = React.useState([])
  const {user} = useUser()
  const [thisData, setThisData] = useState(data)


  useEffect(() => {
    setThisData(data)
    thisData.title = 'here'
    async function getClients() {
      const res = getClients(user.emailAddresses[0].emailAddress)
      setClients(res)
    }
    if (user) {
     // getClients()
    }
    
  }, [user, data, thisData])

  return (
    <div>
      {clients.length > 0 ? (
        clients.map((client) => <ClientCard key={client.id} data={client} />)
      )
        : <div className='flex items-start justify-center py-8'>
          <div>No clients yet, Please add a client <Dialogue title={thisData.title} data={thisData} /></div>
        </div>
      }
    </div>
  )
}
