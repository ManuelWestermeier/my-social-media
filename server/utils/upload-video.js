import path from "path";
import fs from "fs";
import { videoSearchItems } from "./search.js";

export default function uploadVideo(req, res) {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded.');
    }

    const userRootPath = `data/user/${req.query.user}/`

    const userData = JSON.parse(fs.readFileSync(userRootPath + "data.txt", "utf-8"))

    userData.videos.push(req.id)

    fs.writeFileSync(userRootPath + "data.txt", JSON.stringify(userData), "utf-8")

    const videoData = {
        auth: req.query.user,
        likes: 0,
        title: req.query.title,
        date: new Date().toLocaleDateString(),
        description: req.query?.description || ""
    }

    fs.writeFileSync(path.join(req.uploaddir, "data.txt"), JSON.stringify(videoData), "utf-8")
    fs.writeFileSync(path.join(req.uploaddir, "views.txt"), "0", "utf-8")
    fs.writeFileSync(path.join(req.uploaddir, "comments.txt"), "[]", "utf-8")

    //push the videodata
    videoSearchItems.push({
        id: req.id,
        search: (videoData.title + " " + videoData.description).toLocaleLowerCase()
    })

    res.json({ id: req.id });
}