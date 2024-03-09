'use client'

import { useCartStore } from "@/store"
import { AddToCartType } from "../types/AddToCartType"

export default function AddToCart({name, id, img, price, quantity}:AddToCartType){
    const CartStore = useCartStore()
    
    return(
        <>
            <button 
            onClick={() => CartStore.addProduct({name, id, img, price}) }
            className="
            bg-black
            bg: border-black
            text-white
            transition-colors 
            duration-200 
            px-3 
            py-1 
            border-2 
            rounded-md 
            uppercase
            hover:bg-accent 
            hover:border-accent
            ">
                Add To Cart
            </button>
        </>
    )
}