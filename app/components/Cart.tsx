'use client'

import Image from 'next/image'
import { useCartStore } from '@/store'

export default function Cart(){
    const cartStore = useCartStore()
    return(
        <div>
            {cartStore.isOpen}
        </div>
    )
}