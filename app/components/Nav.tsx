'use client'

import {Session} from 'next-auth'
import {signIn} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import Cart from './Cart'
import { useCartStore } from '@/store'
import { AiFillShopping } from "react-icons/ai";

export default function Nav({user}: Session){
    const cartStore = useCartStore()
    return(
        <nav
        className='
        py-5
        bg-primary
        mb-12
        '>
            <div className='
            mx-32 
            flex
            justify-between
            items-center'>
                <Link href={`../`}>
                    <h1 className='text-bgBlack font-bold text-2xl'>OctopusShop</h1>
                </Link>
                <ul
                className='
                flex
                flex-row
                items-center
                gap-12
                '>
                    <li className='
                    flex
                    items-center
                    text-3xl
                    relative
                    cursor-pointer
                    '>
                        <AiFillShopping />
                        <span className='
                        bg-teal-700 
                        text-white 
                        text-sm 
                        font-bold 
                        w-5 h-5 
                        rounded-full 
                        absolute 
                        left-4 
                        bottom-4 
                        flex 
                        items-center 
                        justify-center'>
                            {cartStore.cart.length}
                        </span>
                    </li>
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
                {cartStore.isOpen && <Cart />}
            </div>
        </nav>
    )
}