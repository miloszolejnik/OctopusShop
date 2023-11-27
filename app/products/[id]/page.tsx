
import { SearchParamsTypes } from '@/app/types/searchParams'
import Image from 'next/image'
import formatPrice from '@/app/util/priceFormat'

export default async function Product({searchParams}:SearchParamsTypes){
    return(
        <div className='flex flex-row gap-6 text-gray-700'>
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
                className='justify-between'>
                <h1 className='justify-center font-bold pb-8'>
                    {searchParams.name}
                </h1>
                <p className='text-accent pb-8'>
                    {searchParams.price !== null ? formatPrice(searchParams.price) : 'N/A'}
                </p>
                <button 
                className='
                hover:bg-accent 
                transition-colors 
                duration-200 px-3 
                py-1 
                border-2 
                rounded-md 
                hover:border-accent'>
                    Dodaj do koszyka
                </button>
            </div>
        </div>
    )
}