import fs from "fs";

export var videos = fs.readdirSync("data/uploads");

export default function randomVideo(req, res) {
    res.send(videos[Math.floor(Math.random() * videos.length)])
}