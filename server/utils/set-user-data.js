import { login } from "./login.js";
import fs from "fs";

export const setUserData = (req, res) => {
    var isAuth = login(req);

    if (!isAuth[0]) return res.send("Not authorized")

    const searchParams = (new URL("http:localhost/" + req.url)).searchParams

    const user = searchParams.get("user")
    const userRootPath = `data/user/${user}/`

    const userData = JSON.parse(fs.readFileSync(userRootPath + "data.txt", "utf-8"))

    var change = searchParams.get("change")

    if (!userData[change]) {
        return res.send("not existing parameter")
    }

    if (change == "name") {
        const name = searchParams.get("name")
        userData.name = name.length > 50 ? "too long" : name
    }
    else if (change == "description") {
        const description = searchParams.get("description")
        userData.description = description.length > 1500 ? "too long" : description
    }
    else {
        return res.send("chnage not found")
    }

    fs.writeFileSync(userRootPath + "data.txt", JSON.stringify(userData), "utf-8")

    res.send("sucess")
}