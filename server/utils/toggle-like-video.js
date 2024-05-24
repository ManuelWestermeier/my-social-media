import { login } from "./login";
import fs from "fs";

export default function toggleLlikeVideo(req, res) {
    if (!login(req)[0]) {
        return res.send("auth error");
    }

    const user = req.query.user
    const videoId = req.query.videoId

    

}