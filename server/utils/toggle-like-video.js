import { login } from "./login.js";
import fs from "fs";

export default function toggleLikeVideo(req, res) {
    if (!login(req)[0]) {
        return res.status(400).send("auth error");
    }

    const user = req.query.user
    const videoId = req.query.videoId

    const userDataPath = `data/user/${user}/data.txt`
    const userData = JSON.parse(fs.readFileSync(userDataPath, 'utf8'))

    const videDataPath = `data/uploads/${videoId}/data.txt`
    if (!fs.existsSync(videDataPath)) {
        return res.status(400).send("video not found")
    }
    const videoData = JSON.parse(fs.readFileSync(videDataPath, 'utf8'));

    if (userData.liked.includes(videoId)) {
        //unlike
        userData.liked = userData.liked.filter(id => id != videoId)
        videoData.likes--
    } else {
        //like
        userData.liked.push(videoId)
        videoData.likes++
    }

    fs.writeFileSync(userDataPath, JSON.stringify(userData), "utf-8")
    fs.writeFileSync(videDataPath, JSON.stringify(videoData), "utf-8")

    res.send("sucessfully liked")
}