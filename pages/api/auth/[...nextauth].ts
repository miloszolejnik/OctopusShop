import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Stripe from "stripe"

const prisma = new PrismaClient()

export const authOptions={
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // Add another Provider
  ],
  events:{
    createUser: async ({user}:any) =>{
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2022-11-15'
      })
      // Let's create a stripe customer
      if(user.name && user.email){
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,   
      })
      //Update prisma user with stripecustomerid
      await prisma.user.update({
        where: {id: user.id},
        data: {stripeCustomerId: customer.id},
      })
    }
    }
  }
}

export default NextAuth(authOptions)