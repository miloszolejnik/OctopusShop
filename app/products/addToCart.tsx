'use client'

import { useCartStore } from "@/store"
import { AddToCartType } from "../types/AddToCartType"
import { useState } from "react"

export default function AddToCart({name, id, img, price, quantity}:AddToCartType){
    const CartStore = useCartStore()
    const [added, setAdded] = useState(false)

    const handleAddToCart = () =>{
        CartStore.addProduct({name, id, img, price})
        setAdded(true)
        setTimeout(()=>{
            setAdded(false)
        },500)
    }

    return(
        <>
            <button 
            onClick={handleAddToCart}
            disabled={added}
            className="
            my-4 btn btn-primary lg:w-auto w-screen
            ">
                Add to Cart
            </button>
        </>
    )
}