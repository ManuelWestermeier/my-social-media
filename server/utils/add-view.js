import fs from 'fs';

export default function addView(req, res) {
    const videoPath = `data/uploads/${req.query.id}/views.txt`

    if (!fs.existsSync(videoPath)) {
        return res.status(404).send("video not found");
    }

    const views = parseInt(fs.readFileSync(videoPath, 'utf8')) + 1;
    fs.writeFileSync(videoPath, views.toString())

    res.send("view added")
}