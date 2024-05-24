import { login } from "./login";
import fs from "fs";

export default function addComment(req, res) {
    if (!login(req)[0]) {
        return res.status(404).send("not authenticated");
    }

    const auth = req.query.user;
    const text = req.query.text;
    const videoId = req.query.videoId;

    const videCommentPath = `data/uploads/${videoId}/comments.txt`

    if (!fs.existsSync(videCommentPath)) {
        return res.status(404).send("Couldn't find video")
    }

    const videoComments = JSON.parse(fs.readFileSync(videCommentPath, "utf-8"))

    videoComments.unshift({
        auth, text
    })

    fs.writeFileSync(videCommentPath, JSON.stringify(videoComments), "utf-8")

    res.send("sucessfully added comment")
}