import { login } from "./login.js";
import fs from "fs"

export default function deleteComment(req, res) {
    if (!login(req)[0]) {
        return res.status(404).send("not authenticated");
    }

    const commentAuthor = req.query.user
    const commentText = req.query.text
    const videoId = req.query.id

    if (!commentAuthor || !commentText || !videoId) {
        return res.status(404).send("not authenticated");
    }

    const videCommentPath = `data/uploads/${videoId}/comments.txt`

    if (!fs.existsSync(videCommentPath)) {
        return res.status(404).send("Couldn't find video")
    }

    var videoComments = JSON.parse(fs.readFileSync(videCommentPath, "utf-8"))

    videoComments = videoComments.filter(
        (comment) => !(comment.text == commentText && comment.auth == commentAuthor)
    )

    fs.writeFileSync(videCommentPath, JSON.stringify(videoComments), "utf-8")

    res.send("sucessfully deleted comment")
}