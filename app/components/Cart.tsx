'use client'

import Image from 'next/image'
import formatPrice from '../util/priceFormat';
import basket from '../png/basket.png'
import { useCartStore } from '@/store'
import {IoAddCircle, IoRemoveCircle} from 'react-icons/io5'
import {AnimatePresence, motion} from 'framer-motion'
import CheckOut from './CheckOut';

export default function Cart(){
    const cartStore = useCartStore();
    //Total Price
    const totalPrice = cartStore.cart.reduce((acc, item) =>{
        return acc + item.price! * item.quantity!
    }, 0)

    return(
        <AnimatePresence>
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={() =>{ cartStore.toggleCart()}} 
            layout
            className='fixed w-full h-screen left-0 top-0 bg-black/25'>
            {/* Cart itself  */}
            <motion.div
            layout
            onClick={(e) => e.stopPropagation()} 
            className='
            bg-bgCard 
            absolute right-0 
            top-0 
            w-screen 
            h-screen 
            lg:w-2/5
            p-12 
            overflow-y-scroll 
            text-gray-700
            '>
                {/* Checking the state of the checkout */}
                {cartStore.onCheckout === 'cart' && (
                    <>
                    {/* Check if there are any items in the cart to render */}
                    {cartStore.cart.length > 0 && (
                        <motion.div layout>
                            <h1>here's your shopping list buddy 😎</h1>
                            {/*Cart items*/}
                            {cartStore.cart && cartStore.cart.map((item) => (
                                <motion.div className='flex py-4 gap-4' key={`${Math.floor(Math.random() * 101)}`}>
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
                                </motion.div>
                            ))}
                        </motion.div>
                        )}
                    </>
                    )}
                    {/* Checkout and Total Price */}
                    {cartStore.onCheckout === 'cart' &&(
                        <motion.div layout>
                                <h1>Total: {formatPrice(totalPrice)}</h1>
                                {/* Checkout button */}
                                <button 
                                onClick={() => cartStore.setOnCheckout('checkout')}
                                className='py-2 mt-4 bg-accent  rounded-md text-white w-full'>
                                    Checkout
                                </button>
                            </motion.div>
                            )}
                                {/* Empty cart message */}
                                {cartStore.cart.length <= 0 &&(
                                    <motion.div 
                                    animate={{scale:1, rotateZ:0, opacity:0.75}}
                                    initial={{scale:0.5, rotateZ:-10, opacity:0 }}
                                    exit={{scale:0.5, rotateZ:-10, opacity:0 }}
                                    className='flex flex-col items-center gap-12 text-2xl font-medium'>
                                        <h1>Oh, its bit empty innit? 😒</h1>
                                        <Image src={basket} alt="basket is empty" width={200} height={200} className='opacity-75'/>
                                    </motion.div>
                                )}
                                {cartStore.onCheckout === 'cart' &&(
                                <motion.div className='flex justify-center text-2xl mt-12 cursor-pointer'>
                                    <h1 onClick={() => cartStore.toggleCart()}>Back to store 🏃‍♀️</h1>
                                </motion.div>
                                )}
                                {cartStore.onCheckout === 'checkout' && 
                                <>
                                    <CheckOut />
                                    <motion.div className='flex justify-center text-2xl mt-12 cursor-pointer'>
                                        <h1 onClick={() => cartStore.setOnCheckout("cart")}>Back to cart 🧺</h1>
                                    </motion.div>
                                </>
                                }
                    </motion.div>
                    
            </motion.div>
        </AnimatePresence>
    )
}