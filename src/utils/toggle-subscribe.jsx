export default function toggleSubscribe(subscribed, setAuthUserData, id) {
  return () => {
    var newData;

    if (subscribed) {
      //unsubscribe
      setAuthUserData((old) => {
        newData = {
          ...old,
          abonnements: old.abonnements.filter((currentId) => currentId !== id),
        };
        return newData;
      });
    } else {
      //subscribe
      setAuthUserData((old) => {
        newData = {
          ...old,
          abonnements: [...old.abonnements, id],
        };
        return newData;
      });
    }

    log(newData);
  };
}
