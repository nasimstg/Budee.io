"use client"
import React from 'react'
import  HelpPage from "./HelpPage.mdx"
import { MDXProvider } from '@mdx-js/react'

const components = {
  h1: props => <h1 className='text-3xl border-b my-4 pb-2' {...props} />,
  ul: props => <ul style={{listStyleType: 'circle'}} {...props} />,
  li: props => <li style={{marginLeft: '20px'}} {...props} />,
}

export default function page() {
  return (
    <MDXProvider components={components}> 
      <HelpPage />
    </MDXProvider>
  )
}
