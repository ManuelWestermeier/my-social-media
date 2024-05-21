import fs from "fs"

export default function getUserName(req, res) {
    const userId = (new URL("http:localhost/" + req.url)).searchParams.get("id");

    if (!userId) {
        return res.send("No user id")
    }

    const userPath = `./data/user/${userId}/data.txt`;

    if (!fs.existsSync(userPath)) {
        return res.send("Couldn't find user")
    }

    res.send(JSON.parse(fs.readFileSync(userPath, 'utf8')).name);
}