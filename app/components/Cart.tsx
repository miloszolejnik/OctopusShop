'use client'

import Image from 'next/image'
import { useCartStore } from '@/store'
import formatPrice from '../util/priceFormat';
import {IoAddCircle, IoRemoveCircle} from 'react-icons/io5'
import { ProductType } from '../types/ProductType';
import { AddToCartType } from '../types/AddToCartType';
import basket from '../png/basket.png'

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
                {cartStore.cart.length > 0 && (
                    <>
                <h1>here's your shopping list buddy 😎</h1>
                {cartStore.cart && cartStore.cart.map((item) => (
                    <div className='flex py-4 gap-4' key={item.id}>
                        <Image src={item.img as string} alt={item.name} width={120} height={120} className='rounded-md h-24' />
                        <div>
                            <h2>{item.name}</h2>
                            <div className='flex gap-2 text-md'>
                                <h2>Quantity:</h2>
                                    {/*Update quantity of the product */}
                                    <button onClick={() => cartStore.addProduct({id: item.id, img: item.img, quantity: item.quantity, name: item.name, price: item.price})}><IoAddCircle/></button>
                                    <h2>{item.quantity}</h2>
                                    <button onClick={() => cartStore.removeProduct({id: item.id, img: item.img, quantity: item.quantity, name: item.name, price: item.price})}><IoRemoveCircle/></button>
                            </div>
                            <p className='text-sm'>{formatPrice(item.price as number)}</p>
                        </div>
                    </div>
                ))}
                    <button 
                    className='py-2 mt-4 bg-accent  rounded-md text-white w-full'>
                        Checkout
                    </button>
                    </>
                )}
                {cartStore.cart.length <= 0 &&(
                    <div className='flex flex-col items-center gap-12 text-2xl font-medium'>
                        <h1>Oh, its empty innit? 😒</h1>
                        <Image src={basket} alt="basket is empty" width={200} height={200} className='opacity-75'/>
                    </div>
                )}
            </div>
        </div>
    )
}