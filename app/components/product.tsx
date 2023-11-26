import Image from 'next/image'
import formatPrice from '../util/priceFormat'
import { ProductType } from '../types/ProductType'

export default function Product({name, img, price}:ProductType){
    return(
        <div>
            <Image src={img} alt={name} height={400} width={400} />
            <h1>{name}</h1>
            <p>{price !== null ? formatPrice(price) : 'N/A'}</p>
        </div>
        )
}