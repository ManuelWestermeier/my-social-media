export default function uploadVideo(req, res) {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded.');
    }

    console.log(req.id)

    res.json({ id: req.id });
}