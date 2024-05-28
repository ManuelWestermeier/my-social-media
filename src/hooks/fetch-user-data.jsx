import { useEffect } from "react";
import useLocalStorage from "use-local-storage";
import getRequestUrl from "../utils/get-request-url";

export default function useFetchUserData(auth) {
  const [userData, setUserData] = useLocalStorage(
    "social-media-userdata",
    false
  );

  useEffect(() => {
    //is the client is authenticated fetch the userdata from the server
    if (!auth) return;

    try {
      fetch(getRequestUrl("/get-user-data", auth)).then(async (response) => {
        if (!response.ok) return;

        const userDataFromServer = await response.json();

        if (!userDataFromServer.error) {
          userDataFromServer.userData.videos.reverse();
          setUserData(userDataFromServer.userData);
        }
      });
    } catch (error) {}
  }, [auth]);

  return [userData, setUserData, auth];
}
