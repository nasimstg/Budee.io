import React from 'react'
import ClientCard from './client-card'

const client1 = {
  title: "Client 1",
  budget: "1059$",
  trend: "+30%"
}

export default function Body() {
  return (
    <div>
        <ClientCard data={client1}/>
    </div>
  )
}
