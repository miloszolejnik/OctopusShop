import Image from 'next/image'
import formatPrice from '../util/priceFormat'
import { ProductType } from '../types/ProductType'
import Link from 'next/link'

export default function Product({name, img, price, id, metadata}:ProductType){
    const {features} = metadata
    return(
        <div className='bg-bgCard flex flex-col pb-6 rounded-md drop-shadow-lg hover:drop-shadow-2xl duration-200 hover:translate-y-1 transition-all'>
            <Link href={{pathname: `/products/${id}`, query: {name, img, price, id, features}}}>
                <Image 
                    src={img} 
                    alt={name} 
                    height={800} 
                    width={800} 
                    className='w-full object-contain pb-6'/>
            </Link>
            <div className='px-6 font-medium'>
                <h1 className='text-center truncate font-bold pb-2'>{name}</h1>
                <div className='flex flex-row justify-between'>
                    <p className='text-accent'>{price !== null ? formatPrice(price) : 'N/A'}</p>
                </div>
            </div>
        </div>
        )
}