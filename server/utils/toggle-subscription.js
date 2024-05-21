import { login } from "./login";
import securifyPath from "./securify-path";
import fs from "fs"

export default function toggleSubscribtion(req, res) {
    if (!login(req)[0]) {
        return res.send("You must be logged in")
    }

    const subscription = securifyPath(
        (new URL("http://localhost" + req.URL))
            .searchParams.get("subscription")
    )

    const subscriptionDataPath = `data/users/${subscription}/data.txt`

    if (fs.existsSync(subscriptionDataPath)) {
        return res.send("Subscription Not found")
    }

    const userData = JSON.parse(fs.readFileSync(subscriptionDataPath, "utf-8"))
}