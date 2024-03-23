"use client"

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import { useCartStore, useThemeStore } from "@/store"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Elements } from "@stripe/react-stripe-js"
import {motion} from 'framer-motion'
import CheckoutForm from "./CheckoutForm"
import OrderAnimation from "./OrderAnimation"

const publicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
const stripePromise = loadStripe(publicKey as string)

export default function Checkout() {
  const cartStore = useCartStore()
  const router = useRouter()
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
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

  const ThemeStore = useThemeStore()

  const options: StripeElementsOptions ={
    clientSecret,
    appearance: {
      theme: `${ThemeStore.mode === 'light' ? 'stripe' : 'night'}`,
      labels: 'floating',
    }
  }

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}}>
      {!clientSecret && <OrderAnimation />}
      {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
      )}
    </motion.div>
  )
}
