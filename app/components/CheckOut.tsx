"use client"

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import { useCartStore } from "@/store"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export default function Checkout() {
  const cartStore = useCartStore()
  const router = useRouter()
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    //Set the theme of stripe
    //Create a paymentIntent as soon as the page loads up
    fetch("/api/create-paymant-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartStore.cart,
        payment_intent_id: cartStore.paymentIntent,
      }),
    })
      .then((res) => {
        if (res.status === 403) {
          return router.push("/api/auth/signin")
        }
        return res.json()
      })
      .then((data) => {
        setClientSecret(data.paymentIntent.client_secret)
        cartStore.setPaymentIntent(data.paymentIntent.id)
      })
  }, [])

  return (
    <button>
      {`${console.log('i have been summoned')}` && ''}
      hello
    </button>
  )
}
