import { useEffect } from "react";
import useLocalStorage from "use-local-storage";

export default function useAuth() {
    const [auth, setAuth] = useLocalStorage("social-media-auth-data", false)

    useEffect(() => {
        log("authenticated", auth)
    }, [auth])

    return [auth, setAuth]
}