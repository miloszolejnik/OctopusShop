'use client'

import { animate, motion } from "framer-motion"
import Link from "next/link"
import { useCartStore } from "@/store"
import { useEffect } from "react"
import { Player } from '@lottiefiles/react-lottie-player'
import success from '@/success.json'

export default function OrderConfirmed(){
    const cartStore = useCartStore()
    useEffect(()=>{
        cartStore.paymentIntent = ('')
        cartStore.clearCart()
    }, [])
    return(
        <motion.div 
        initial={{scale:0.5, opacity:0}} 
        animate={{scale: 1, opacity:1}}
        className={'flex flex-col justify-center text-center my-12'}
        >
            <div className="pt-12 rounded-r-md">
                <h1 className="text-2xl font-bold">Your order has been placed 🚀</h1>
                <h2 className="my-8 font-bold">Check your email for receipt</h2>
            </div>
            <div className="flex flex-col text-center justify-center gap-12">
                <Link 
                href={'/dashboard'}
                onClick={() => {
                        setTimeout(() =>{
                            cartStore.setOnCheckout('cart')
                            cartStore.setCheckout('')
                        }, 60)
                        cartStore.toggleCart()
                }}
                >
                    <button className='py-2 px-4 rounded-md ease-in-out duration-200'>
                        Check your order
                    </button>
                </Link>
            </div>
                    <Player src={success} autoplay keepLastFrame/>
        </motion.div>
    )
}

