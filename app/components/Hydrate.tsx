'use client'
import { useThemeStore } from "@/store"
import { ReactNode, useEffect, useState } from "react"

export default function Hydrate({children}: {children: ReactNode}){
    const [isHydratd, setIsHydrated] = useState(false)
    const themeStore = useThemeStore()
    // Wait till NextJS rehydration completes
    useEffect(() =>{
        setIsHydrated(true)
    }, [])
    return(
        <>
        {isHydratd ? <body data-theme={themeStore.mode}>{children}</body> : <body></body>}
        </>
    )
}