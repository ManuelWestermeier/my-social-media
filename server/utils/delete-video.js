import { login } from "./login.js";
import fs from "fs"

export default function deleteVideo(req, res) {
    if (!login(req)[0]) {
        return res.status(400).send("not authenticated");
    }

    const user = req.query.user
    const videoId = req.query.videoId

    //delete video
    const videoPath = `data/uploads/${videoId}/`
    if (!fs.existsSync(videoPath)) {
        return res.status(404).send("video not found")
    }

    const videoData = JSON.parse(fs.readFileSync(videoPath + "data.txt", "utf-8"))
    if (videoData.auth != user) {
        return res.status(400).send("video auth is not you");
    }

    fs.unlinkSync(videoPath)

    //delete video from user data
    const userDataPath = `data/user/${user}/data.txt`
    const userData = JSON.parse(fs.readFileSync(userDataPath, "utf-8"))

    userData.videos.splice(userData.videos.indexOf(videoId), 1)

    fs.writeFileSync(userDataPath, JSON.stringify(userData, null, 2))

    return res.send("video deleted")
}