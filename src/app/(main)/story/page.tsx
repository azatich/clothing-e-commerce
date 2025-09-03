import React from 'react'
import StoryPage from './StoryPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Story",
    description: "Our journey towards a futuristic e-commerce experience.",
}

const page = () => {
  return (
    <StoryPage />
  )
}

export default page