import securifyPath from "./securify-path.js"
import fs from 'fs';

export const sendProfileImage = (req, res) => {
    const id = req.params.id;

    if (!securifyPath(id)) {
        return res.send("error")
    }

    const pathToImage = `data/user/${id}/`

    if (!fs.existsSync(pathToImage)) {
        return res.send("error")
    }

    if (!fs.existsSync(pathToImage + "profile.jpg")) {
        return res.sendFile("assets/default-profile.jpg", { root: "." })
    }

    res.sendFile(pathToImage + "profile.jpg", { root: "." });
}