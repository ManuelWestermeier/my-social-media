import { hashPassword } from './hash.js';
import securifyPath from './securify-path.js';
import fs from "fs";

export const login = req => {
    const searchParams = (new URL("http:localhost/" + req.url)).searchParams
    const user = searchParams.get("user")
    const password = searchParams.get("password")
    const email = searchParams.get("email")

    if (!user || !password || !email) {
        return [false, "Invalid username, email or password"]
    }

    if (!securifyPath(user)) {
        return [false, "Invalid username"]
    }

    const userRootPath = `data/user/${user}/`

    if (!fs.existsSync(userRootPath)) {
        return [false, "Username, password or email wrong"]
    }

    if (fs.readFileSync(userRootPath + "password.txt", "utf-8") != hashPassword(password)) {
        return [false, "Username, password or email wrong"]
    }

    if (fs.readFileSync(userRootPath + "email.txt", "utf-8") != email) {
        return [false, "Username, password or email wrong"]
    }

    return [true, "Auth successfully"]

}