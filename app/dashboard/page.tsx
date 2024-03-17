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
            userId: user?.user?.id
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
        <div>
            <h1 className="text-bold">Your Orders 📝</h1>
            <div className="font-medium">
                {orders.map((order) => (
                    <div key={order.id} className="rounde-lg p-8 my-12">
                        <h2>Order reference: {order.id}</h2>
                        <p>Time: {new Date(order.createdDate).toDateString()}</p>
                        <p className="text-md py-2">
                            Status: <span className={`${order.status === 'complete' ? "bg-accent" : "bg-red-700"} text-white py-1 rounded-md px-2 mx-2 text-sm`}>{order.status}</span>
                        </p>
                        <p className="font-medium">Total {formatPrice(order.amount)}</p>
                        <div className="flex gap-8">
                            {order.products.map((product) =>(
                                <div className="py-2" key={product.id}>
                                    <h2 className="py-2">{product.name}</h2>
                                    <div className="flex flex-col items-center gap-4">
                                        <Image 
                                        src={product.image!} 
                                        alt={product.name} 
                                        width={36} 
                                        height={36}/>
                                        <p>Product price: {formatPrice(product.price)}</p>
                                        <p>Quantity {product.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}