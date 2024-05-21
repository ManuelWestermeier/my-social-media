import { hashPassword } from './hash.js';
import securifyPath from './securify-path.js';
import fs from "fs";

export const createUser = (req, res) => {
    const searchParams = (new URL("http:localhost/" + req.url)).searchParams
    const user = searchParams.get("user")
    const password = searchParams.get("password")
    const email = searchParams.get("email")

    if (!user || !password || !email) {
        return res.json({ error: "No user, email or password set" })
    }

    if (!securifyPath(user)) {
        return res.json({ error: "Username have to include alphabetic characters and numbers characters and _-" })
    }

    const userRootPath = `data/user/${user}/`

    if (fs.existsSync(userRootPath)) {
        return res.json({ error: `Username ${user} already exists` })
    }

    const userData = {

    }

    fs.mkdirSync(userRootPath, { recursive: true })
    fs.writeFileSync(userRootPath + "password.txt", hashPassword(password), "utf-8")
    fs.writeFileSync(userRootPath + "email.txt", email, "utf-8")
    fs.writeFileSync(userRootPath + "data.txt", JSON.stringify(userData), "utf-8")

    res.json({ error: false })

}