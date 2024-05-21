import { useEffect } from "react";
import useLocalStorage from "use-local-storage";
import getRequestUrl from "../utils/get-request-url";

export default function useAuth() {
  const [auth, setAuth] = useLocalStorage("social-media-auth-data", false);

  useEffect(() => {
    if (!auth) return;
    fetch(getRequestUrl("/login", auth))
      .then((res) => res.json())
      .then(([isAuth]) => {
        if (!isAuth) {
          setAuth(false);
        }
      });
  }, []);

  return [auth, setAuth];
}
