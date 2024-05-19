import { useEffect, useState } from 'react'
import useLocalStorage from 'use-local-storage'

export default function useFetchUserData() {
    const [userData, setUserData] = useLocalStorage("social-media-userdata", false)
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        
    }, [])

    useEffect(() => {
        
    }, [userData])

    return [userData, setUserData, isAuth]
}