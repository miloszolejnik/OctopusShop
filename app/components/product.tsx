import Image from 'next/image'

export default function Product({name, img, price}){
    return(
        <div>
            <Image src={img} alt={name} height={400} width={400} />
            <h1>{name}</h1>
        {price}
        </div>
        )
}