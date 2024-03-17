import Stripe from "stripe"
import { NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "./auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { prisma } from "@/app/util/prisma"

const secretKey = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(secretKey as string, {
  apiVersion: "2022-11-15",
})

const calculateOrderAmount = (items: any) => {
    const totalPrice = items.reduce((acc: any, item: any) => {
      return acc + item.price! * item.quantity!
    }, 0)
    return totalPrice}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //Get user
  const userSession = await getServerSession(req, res, authOptions)
  if (!userSession?.user) {
    res.status(403).json({ message: "Not logged in" })
    return
  }
  //Extract the data from the body
  const { items, payment_intent_id } = req.body
  const total = calculateOrderAmount(items)
  //Create the order data
  const orderData = {
    user: { connect: { id: userSession.user?.id } },
    amount: total,
    currency: "PLN",
    status: "pending",
    paymentIntentID: payment_intent_id,
    products: {
      create: items.map((item: any) => ({
        name: item.name,
        price: parseFloat(item.price),
        image: item.img,
        quantity: item.quantity,
      })),
    },
  }

  //Check if the payment intent exists just update the order
  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    )
    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: total }
      )
      //Fetch order with product ids
      const [existing_order, updated_order] = await Promise.all([
        prisma.order.findFirst({
          where: { paymentIntentID: updated_intent.id },
          include: { products: true },
        }),
        prisma.order.update({
          where: { paymentIntentID: updated_intent.id },
          data: {
            amount: total,
            products: {
              deleteMany: {},
              create: items.map((item) => ({
                name: item.name,
                price: parseFloat(item.price),
                image: item.img,
                quantity: item.quantity,
              })),
            },
          },
        }),
      ])

      if (!existing_order) {
        res.status(400).json({ message: "Invalid Payment Intent" })
      }
      res.status(200).json({ paymentIntent: updated_intent })
      return
    }
  } else {
    //Create a new order with prisma
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "PLN",
      automatic_payment_methods: { enabled: true },
    })

    orderData.paymentIntentID = paymentIntent.id
    const newOrder = await prisma.order.create({
      data: orderData,
    })
    res.status(200).json({ paymentIntent })
  }
}