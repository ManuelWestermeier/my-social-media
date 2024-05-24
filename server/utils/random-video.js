import { videoSearchItems } from "./search.js";

export default function randomVideo(req, res) {
    res.send(videoSearchItems[Math.floor(Math.random() * videoSearchItems.length)].id)
}