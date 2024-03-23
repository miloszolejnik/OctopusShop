import './globals.css'
import Nav from './components/Nav'
import {getServerSession} from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Hydrate from './components/Hydrate'
import {Roboto} from 'next/font/google'

//Define main font
const roboto = Roboto({
  weight: ['400','500', '700'],
  subsets: ['latin', 'latin-ext']
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //Fetch the user
  const session =await getServerSession(authOptions)
  return (
    <html lang="en" className={`${roboto.className} h-screen z-100`} suppressHydrationWarning={true}>
      <Hydrate>
            <Nav user={session?.user} expires={session?.expires as string} />
            <main className='pt-24 h-screen lg:px-24'>
              {children}
            </main>
        </Hydrate>
    </html>
  )
}