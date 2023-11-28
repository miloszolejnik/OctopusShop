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
            hover:bg-accent 
            transition-colors 
            duration-200 
            px-3 
            py-1 
            border-2 
            rounded-md 
            hover:border-accent">
                Add To Cart
            </button>
        </>
    )
}