import { useEffect, useState } from 'react'
import useLocalStorage from 'use-local-storage'

export default function useFetchUserData(auth) {
    const [userData, setUserData] = useLocalStorage("social-media-userdata", false)
    const [isAuth, setIsAuth] = useState(!!auth)

    useEffect(() => {
        if (!!auth) {
            log("fetch-user-data", auth)
        }
    }, [])

    useEffect(() => {
        log("user-data-chnge", userData)
    }, [userData])

    return [userData, setUserData, isAuth]
}