'use client'

import {Session} from 'next-auth'
import {signIn, signOut} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import Cart from './Cart'
import { useCartStore } from '@/store'
import { AiFillShopping } from "react-icons/ai";
import {AnimatePresence, motion} from 'framer-motion'
import DarkLight from './DarkLight'
import {Lobster_Two} from 'next/font/google'

const lobster = Lobster_Two({
    weight: ['400','700'],
    subsets: ['latin']
  })

export default function Nav({user}: Session){
    const cartStore = useCartStore()
    return(
        <nav
        className='
        py-1
        absolute
        w-screen
        z-10
        lg:px-24
        bg-primary
        text-accent-content
        '>  
            {/* Shop name / Logo */}
            <div className='
            mx-4 
            flex
            justify-between
            items-center'>
                <Link href={`../`} 
                    className={`
                    ${lobster.className} 
                    text-secondary-content
                    `}>
                    <h1 className='font-bold text-2xl'>OctopusShop</h1>
                </Link>
                <ul
                className='
                flex
                flex-row
                items-center
                '>
                    {/* Swap between light and dark mode */}
                    <DarkLight />
                    {/* Toggle the cart */}
                    <li onClick={() =>{ cartStore.toggleCart()}}
                    className='
                    flex
                    items-center
                    text-3xl
                    relative
                    cursor-pointer
                    mx-4
                    '>
                        <AiFillShopping />
                        <AnimatePresence>
                            {cartStore.cart.length > 0 && (
                                    <motion.span 
                                    animate={{scale: 1}} 
                                    initial={{scale: 0}}
                                    exit={{scale: 0}}
                                    className='
                                    bg-accent
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
                                    </motion.span>
                            )}
                        </AnimatePresence>
                    </li>
                    {/* Check if user is loggedin */}
                    {!user &&(
                        <li
                        className='
                        font-semibold py-2 px-4 rounded-md bg-primary
                        '
                        >
                            <button onClick={()=>signIn()}>signin</button>
                            </li>
                    )}
                    {user &&(
                        <li>
                            <div className='dropdown dropdown-end cursor-pointer'>
                                <Image 
                                src={user?.image as string} 
                                alt={user.name as string} 
                                width={36} 
                                height={36}
                                className='rounded-full'
                                tabIndex={0}
                                />
                                <ul tabIndex={0} className='dropdown-content menu p-4 space-y-4 shadow bg-base-100 rounded-box w-72'>
                                    <Link 
                                    className='
                                        hover: 
                                            bg-base-300 
                                            p-4 
                                            rounded-md' 
                                    href={'/dashboard'} 
                                    onClick={ () => {if(document.activeElement instanceof HTMLElement){
                                            document.activeElement.blur()
                                            }
                                        }
                                    }>Orders</Link>
                                    <li 
                                    className='
                                        hover: 
                                            bg-base-300 
                                            p-4 
                                            rounded-md'
                                    onClick={ () => {
                                        signOut()
                                        if(document.activeElement instanceof HTMLElement){
                                                document.activeElement.blur()
                                                }
                                            }
                                        }
                                    >Sign Out</li>
                                </ul>
                            </div>
                        </li>
                    )}
                    <li>
                        <AnimatePresence>
                            {cartStore.isOpen && <Cart />}
                        </AnimatePresence>
                    </li>
                </ul>
            </div>
        </nav>
    )
}