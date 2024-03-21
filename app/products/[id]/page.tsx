
import { SearchParamsTypes } from '@/app/types/searchParams'
import Image from 'next/image'
import formatPrice from '@/app/util/priceFormat'
import AddToCart from '../addToCart'
export default async function Product({searchParams}:SearchParamsTypes){
    return(
        <div className='
        flex 
        items-center
        text-center
        gap-6 
        flex-col
        lg:flex-row 
        '>
            <Image 
                src={searchParams.img} 
                alt={searchParams.name} 
                height={800} 
                width={800} 
                className='
                object-cover 
                h-96
                w-96
                '/>
                <div 
                className='justify-between lg:text-start'>
                <h1 className='justify-center font-bold pb-8'>
                    {searchParams.name}
                </h1>
                <p className='text-primary'>
                    {searchParams.price !== null ? formatPrice(searchParams.price) : 'N/A'}
                </p>
                <AddToCart {...searchParams} />
            </div>
        </div>
    )
}