import getRequestUrl from "./get-request-url";

export default function toggleSubscribe(subscribed, setAuthUserData, auth, id) {
  return () => {
    fetch(getRequestUrl("/toggle-subscription", { ...auth, subscription: id }));

    if (subscribed) {
      //unsubscribe
      setAuthUserData((old) => {
        return {
          ...old,
          abonnements: old.abonnements.filter((currentId) => currentId !== id),
        };
      });
    } else {
      //subscribe
      setAuthUserData((old) => {
        return {
          ...old,
          abonnements: [...old.abonnements, id],
        };
      });
    }
  };
}
