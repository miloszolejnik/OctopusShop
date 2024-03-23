import Image from 'next/image'
import formatPrice from '../util/priceFormat'
import { ProductType } from '../types/ProductType'
import Link from 'next/link'
import AddToCart from '../products/addToCart'

export default function Product({name, img, price, id, metadata}:ProductType){
    const {features} = metadata
    return(
        <div className='flex flex-col pb-6 rounded-md drop-shadow-lg'>
            <Link href={{pathname: `/products/${id}`, query: {name, img, price, id, features}}}>
                <Image 
                    src={img} 
                    alt={name} 
                    height={800} 
                    width={800} 
                    className='w-full object-contain pb-6'/>
            </Link>
            <div className='font-medium flex flex-col text-center'>
                <h1 className='text-center truncate font-bold pb-2'>{name}</h1>
                    <p className=''>{price !== null ? formatPrice(price) : 'N/A'}</p>
                    <AddToCart {...{name, id, img, price}} />
            </div>
        </div>
        )
}