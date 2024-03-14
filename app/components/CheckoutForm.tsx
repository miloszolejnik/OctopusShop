'use client'

import { useState, useEffect } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import formatPrice from '@/app/util/priceFormat'
import { useCartStore } from "@/store"

export default function CheckoutForm({clientSecret}: {clientSecret: string}){
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)

    const cartStore = useCartStore()

    const totalPrice = cartStore.cart.reduce((acc, item) => {
        return acc + item.price! * item.quantity!
      }, 0)

    const formattedPrice = formatPrice(totalPrice)

      useEffect(() => {
        if(!stripe){
            return
        }if(!clientSecret){
            return
        }
      }, [stripe])

      const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault()
        if(!stripe || !elements){
            return
        }
        setIsLoading(true)

        stripe.confirmPayment({
            elements,
            redirect: `if_required`

        })
        .then((result) =>{
            if(!result.error){
                cartStore.setCheckout('success')
            }
            setIsLoading(false)
        })
      }

    return(
        <form id='payment-form' onSubmit={handleSubmit}>
            <PaymentElement id='payment-element' options={{layout: "tabs"}}/>
            <h1>Total: {formattedPrice}</h1>
            <button id='submit' disabled={isLoading || !stripe || !elements}>
                <span id='button-text'>{isLoading ? <span>Loading... 🔮</span> : <span>Pay now</span>}</span>
            </button>
        </form>
    )
}