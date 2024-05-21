import { login } from "./login";
import securifyPath from "./securify-path";
import fs from "fs"

export default function toggleSubscribtion(req, res) {
    if (!login(req)[0]) {
        return res.send("You must be logged in")
    }

    const subscription =
        (new URL("http://localhost" + req.URL))
            .searchParams.get("subscription")

    if (!securifyPath(subscription)) {
        return res.send("invalid subscription name");
    }

    const subscriptionUserDataPath = `data/user/${subscription}/data.txt`

    if (fs.existsSync(subscriptionUserDataPath)) {
        return res.send("Subscription Not found")
    }

    //read

    const userDataPath = `data/user/${subscription}/data.txt`

    const userData = JSON.parse(fs.readFileSync(userDataPath, "utf-8"))

    const subscriptionUserData = JSON.parse(fs.readFileSync(subscriptionUserDataPath, "utf-8"))

    const isSubscribed = userData.subscriptions.includes(subscription)

    //logic
    if (isSubscribed) {
        userData.subscriptions = subscriptionUserData.subscriptions.filter(id => id != subscription)
        subscriptionUserData.follower--
    }
    else {
        userData.subscriptions = [...userData.subscriptions, subscription]
        subscriptionUserData.follower++
    }

    //store them
    fs.writeFileSync(userDataPath, JSON.stringify(userData), "utf-8")
    fs.writeFileSync(subscriptionUserDataPath, JSON.stringify(subscriptionUserData), "utf-8")

    res.send("sucessfully subscribed")

}