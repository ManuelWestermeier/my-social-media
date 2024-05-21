import { login } from "./login.js";
import fs from "fs";

export const getUserData = (req, res) => {
    const isAuth = login(req);

    if (isAuth[0]) {
        const user = (new URL("http:localhost/" + req.url)).searchParams.get("user")
        const userRootPath = `data/user/${user}/`

        const userData = JSON.parse(fs.readFileSync(userRootPath + "data.txt", "utf-8"))

        res.json({
            error: false,
            userData
        });
    } else {
        res.json({ error: isAuth[1] });
    }
}