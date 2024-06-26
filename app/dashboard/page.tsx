import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import {getServerSession} from 'next-auth'
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import formatPrice from "../util/priceFormat"
import Image from "next/image"

export const revalidate = 0

const fetchOrders = async () =>{
    const prisma = new PrismaClient
    const user = await getServerSession(authOptions)
    if(!user){
        return null
    }
    const orders = await prisma.order.findMany({
        where:{
            userId: user?.user?.id,
            status: 'complete',
        },
        include:{
            products: true
        }
    })
    return orders
}

export default async function Dashboard(){
    const orders = await fetchOrders()
    if(orders === null)
        return <div> You need to be logged in to view your orders</div>
    if(orders.length === 0)
    return <div>You have no orders yet</div>
    return(
        <div className="p-8">
            <h1 className="text-bold">Your Orders 📝</h1>
            <div className="font-medium">
                {orders.map((order) => (
                    <div key={order.id} className="rounde-lg my-12 bg-base-300 p-4 rounded-lg">
                        <div className="bg-base-100 p-2 rounded-lg">
                            <h2 className="font-medium">
                                <span className="font-bold">Order reference:</span> 
                                {order.id}
                            </h2>
                        </div>
                        <p className="mt-2">Time: {new Date(order.createdDate).toDateString()}</p>
                        <div className="flex flex-col items-baseline gap-2 py-4">
                            {order.products.map((product) =>(
                                <div className="" key={product.id}>
                                    <h2 className="py-2">{product.name}</h2>
                                    <div className="flex items-center gap-4">
                                        <Image 
                                        priority={true}
                                        src={product.image!} 
                                        alt={product.name} 
                                        height={70}
                                        width={70}
                                        className="w-auto"
                                        />
                                        <div>
                                            <p>Product price: {formatPrice(product.price)}</p>
                                            <p>Quantity: {product.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="">
                            Status:
                            <span 
                            className={`
                                    ${
                                        order.status === 'complete' ?
                                        "bg-success" : 
                                        "bg-warning"
                                    }
                                    py-1 
                                    rounded-md 
                                    px-2 
                                    mx-2 
                                    text-accent-content
                                    `}>{order.status}</span>
                        </p>
                        <p className="mt-4">Total {formatPrice(order.amount)}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}