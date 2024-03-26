import Link from "next/link";
import {Lobster_Two} from 'next/font/google'

const lobster = Lobster_Two({
    weight: ['400','700'],
    subsets: ['latin']
  })

export default function Footer(){
    return(
        <footer 
            className="
                absolute  
                b-0 
                w-screen 
                h-auto 
                text-primary-content
                text-xl
                p-2
                flex
                justify-center
                bg-base-300">
            <Link href={'https://www.linkedin.com/in/mi%C5%82osz-olejnik/'}>
                Made by 
                <span className={`${lobster.className} px-2`}>
                    Miłosz Olejnik
                </span>
                2024
            </Link>
        </footer>
    )
}