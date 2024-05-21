export default function uploadProfileImage(req, res) {
    if (!req.file) {
        return res.status(400).json({ error: "Can't upload profile image" });
    }

    res.json("Sucessfully uploaded");
}