'use client'

import {Session} from 'next-auth'
import {signIn} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export default function Nav({user}: Session){
    return(
        <nav
        className='
        py-8
        bg-primary
        mb-12
        '>
            <div className='
            mx-32 flex
            justify-between
            items-center'>
                <Link href={`../`}>
                    <h1 className='text-bgBlack font-bold text-2xl'>Octopus Shop</h1>
                </Link>
                <ul
                className='
                items-center
                gap-12
                '>
                    {/* Check if user is loggedin */}
                    {!user &&(
                        <li
                        className='
                        bg-accent font-semibold text-white py-2 px-4 rounded-md
                        '
                        >
                            <button onClick={()=>signIn()}>signin</button>
                            </li>
                    )}
                    {user &&(
                        <li>
                            <Image 
                            src={user?.image as string} 
                            alt={user.name as string} 
                            width={48} 
                            height={48}
                            className='
                            rounded-full
                            '
                            />
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}