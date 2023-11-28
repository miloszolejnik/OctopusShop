'use client'
import { ReactNode, useEffect, useState } from "react"

export default function Hydrate({children}: {children: ReactNode}){
    const [isHydratd, setIsHydrated] = useState(false)
    // Waint till NextJS rehydration completes
    useEffect(() =>{
        setIsHydrated(true)
    }, [])
    return(
        <>
        {isHydratd ? <>{children}</> : <div>Loading...</div>}
        </>
    )
}