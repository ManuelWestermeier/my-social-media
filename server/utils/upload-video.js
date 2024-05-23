import path from "path";
import fs from "fs";

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
    }

    fs.writeFileSync(path.join(req.uploaddir, "data.txt"), JSON.stringify(videoData), "utf-8")
    fs.writeFileSync(path.join(req.uploaddir, "views.txt"), "0", "utf-8")
    fs.writeFileSync(path.join(req.uploaddir, "comments.txt"), "[]", "utf-8")
    fs.mkdirSync(path.join(req.uploaddir, "comments"), { recursive: true })

    res.json({ id: req.id });
}