import Image from 'next/image'
import formatPrice from '../util/priceFormat'
import { ProductType } from '../types/ProductType'

export default function Product({name, img, price}:ProductType){
    return(
        <div className='bg-bgCard flex flex-col pb-6 rounded-md drop-shadow-lg hover:drop-shadow-2xl duration-200 hover:translate-y-1 transition-all'>
            <Image 
            src={img} 
            alt={name} 
            height={800} 
            width={800} 
            className='w-full object-contain pb-6'/>
            <div className='px-6 font-medium'>
                <h1 className='text-center truncate font-bold pb-2'>{name}</h1>
                <div className='flex flex-row justify-between'>
                <p className='text-accent'>{price !== null ? formatPrice(price) : 'N/A'}</p>
                <button className='hover:bg-accent transition-colors duration-200 px-3 py-1 border-2 rounded-md hover:border-accent'>Dodaj do koszyka</button>
                </div>
            </div>
        </div>
        )
}