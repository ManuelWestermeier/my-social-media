import { login } from "./login.js";
import securifyPath from "./securify-path.js";
import fs from "fs"

export default function toggleSubscribtion(req, res) {
    if (!login(req)[0]) {
        return res.send("You must be logged in")
    }

    const searchParams = (new URL("http://localhost" + req.url))
    const subscription = searchParams.searchParams.get("subscription")
    const user = searchParams.searchParams.get("user")

    if (!securifyPath(subscription)) {
        return res.send("invalid subscription name");
    }

    const subscriptionUserDataPath = `data/user/${subscription}/data.txt`

    if (!fs.existsSync(subscriptionUserDataPath)) {
        return res.send("Subscription Not found")
    }

    //read

    const userDataPath = `data/user/${user}/data.txt`

    const userData = JSON.parse(fs.readFileSync(userDataPath, "utf-8"))

    const subscriptionUserData = JSON.parse(fs.readFileSync(subscriptionUserDataPath, "utf-8"))

    const isSubscribed = userData.abonnements.includes(subscription)

    if (user == subscription) {
        if (isSubscribed) {
            userData.abonnements = subscriptionUserData.abonnements.filter(id => id != subscription)
            userData.follower--
        }
        else {
            userData.abonnements = [...userData.abonnements, subscription]
            userData.follower++
        }

        fs.writeFileSync(userDataPath, JSON.stringify(userData), "utf-8")

        return res.send("sucessfully subscribed")
    }

    //logic
    if (isSubscribed) {
        userData.abonnements = subscriptionUserData.abonnements.filter(id => id != subscription)
        subscriptionUserData.follower--
    }
    else {
        userData.abonnements = [...userData.abonnements, subscription]
        subscriptionUserData.follower++
    }

    //store them
    fs.writeFileSync(userDataPath, JSON.stringify(userData), "utf-8")
    fs.writeFileSync(subscriptionUserDataPath, JSON.stringify(subscriptionUserData), "utf-8")

    res.send("sucessfully subscribed")

}