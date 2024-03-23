import { SearchParamsTypes } from '@/app/types/searchParams'
import Image from 'next/image'
import formatPrice from '@/app/util/priceFormat'
import AddToCart from '../addToCart'

export default async function Product({searchParams}:SearchParamsTypes){
    return(
        <div className='
        items-center
        text-center
        gap-6 
        flex 
        flex-col
        lg:flex-row 
        '>
            <Image 
                priority={true}
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
                    className='justify-between lg:text-start flex flex-col'
                >
                    <h1 className='justify-center font-bold pb-8'>
                        {searchParams.name}
                    </h1>
                    <div className='font-bold flex flex-row justify-center'>
                        Price:
                        <p className='text-secondary px-4'>
                            {searchParams.price !== null ? formatPrice(searchParams.price) : 'N/A'}
                        </p>
                    </div>
                    <AddToCart {...searchParams} />
                </div>
        </div>
    )
}