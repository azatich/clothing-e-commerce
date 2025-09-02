import { Metadata } from 'next'
import ProfilePage from './Profile'

export const metadata:Metadata = {
  title: 'Profile',
}

const page = () => {
  return (
    <ProfilePage />
  )
}

export default page