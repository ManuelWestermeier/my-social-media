import fs from "fs";

var videos = fs.readdirSync("data/uploads");
var lastModifyed = Date.now();

export default function randomVideo(req, res) {
    const now = Date.now();

    if (lastModifyed + 10000 < now) {
        lastModifyed = now;
        fs.readdir("data/uploads", (err, files) => {
            if (err) return
            console.log(files)
            videos = files;
        });
    }

    res.send(videos[Math.floor(Math.random() * videos.length)])
}