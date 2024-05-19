import { useEffect } from 'react'
import useLocalStorage from 'use-local-storage'

export function useFetchUserData() {
    const [userData, setUserData] = useLocalStorage("social-media-userdata", false)

    useEffect(() => {
        
    }, [])

    useEffect(() => {

    }, [userData])

    return [userData, setUserData]
}