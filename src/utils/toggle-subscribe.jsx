import getRequestUrl from "./get-request-url";

export default function toggleSubscribe(
  subscribed,
  setAuthUserData,
  setFollower,
  auth,
  id,
  navigate
) {
  return () => {
    if (!auth) {
      return navigate("/auth");
    }

    fetch(getRequestUrl("/toggle-subscription", { ...auth, subscription: id }));

    if (subscribed) {
      //unsubscribe
      setAuthUserData((old) => {
        return {
          ...old,
          abonnements: old.abonnements.filter((currentId) => currentId !== id),
        };
      });

      setFollower((old) => old - 1);
    } else {
      //subscribe
      setAuthUserData((old) => {
        return {
          ...old,
          abonnements: [...old.abonnements, id],
        };
      });

      setFollower((old) => old + 1);
    }
  };
}
