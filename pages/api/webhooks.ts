import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import {buffer} from 'micro'
import { NextApiRequest, NextApiResponse } from "next"

const secretKey = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(secretKey as string, {
  apiVersion: "2022-11-15",
})
const prisma = new PrismaClient()

export const config ={
    api:{
        bodyParser: false
    }
}

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']
    console.log(buf)

    if(!sig){
        return res.status(400).send('Missing stripe signature')
    }

    let event: Stripe.Event

    try{
        event = stripe.webhooks.constructEvent(
            buf,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    }catch(err){
        return res.status(400).send('Webhook error' + err)
    }

    //Handle diffrent types of vents
    switch(event?.type){
        case 'payment_intent.created':
            const paymentIntent = event.data.object
            // console.log('payment intent was created')
        break
        case 'charge.succeeded':
            const charge = event.data.object as Stripe.Charge
            if(charge.payment_intent){
                const order = await prisma.order.update({
                    where: {paymentIntentID: charge.payment_intent},
                    data: {status: 'complete'}
                })
            }
        break
        default:
            console.log('unhandled event type' + event.type)
        break
}
res.json({ received: true})
}