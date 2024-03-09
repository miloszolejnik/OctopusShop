'use client'

import Image from 'next/image'
import { useCartStore } from '@/store'
import formatPrice from '../util/priceFormat';

export default function Cart(){
    const cartStore = useCartStore();
    return(
        <div 
        onClick={() =>{ cartStore.toggleCart()}} 
        className='fixed w-full h-screen left-0 top-0 bg-black/25 z-10'>
            <div
            onClick={(e) => e.stopPropagation()} 
            className='
            bg-bgCard absolute right-0 top-0 w-1/4 h-screen p-12 overflow-y-scroll text-gray-700'>
                <h1>here's your shopping list 🟢</h1>
                {cartStore.cart.map((item) => (
                    <div className='flex py-4 gap-4'>
                        <Image src={item.img} alt={item.name} width={120} height={120} className='rounded-md h-24' />
                        <div>
                            <h2>{item.name}</h2>
                            <h2>Quantity:{item.quantity}</h2>
                            <p className='text-sm'>{item.quantity && formatPrice(item.price)}</p>
                        </div>
                    </div>
                ))}
                <button 
                className='py-2 mt-4 bg-accent  rounded-md text-white w-full'>
                    Checkout
                </button>
            </div>
        </div>
    )
}