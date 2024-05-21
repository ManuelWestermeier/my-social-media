import express from 'express';
import { createDiskStorage } from './utils/create-disk-storage.js';
import { createUploadMulter } from './utils/create-upload-multer.js';
import cors from "cors"
import securifyPath from './utils/securify-path.js';
import fs from "fs";
import { hashPassword } from './utils/hash.js';

const app = express();
const port = 3000;

const storage = createDiskStorage();
const upload = createUploadMulter(storage)

app.use(cors({ origin: "*" }))

app.get("/create-user", (req, res) => {
    const searchParams = (new URL("http:localhost/" + req.url)).searchParams
    const user = searchParams.get("user")
    const password = searchParams.get("password")
    const email = searchParams.get("email")

    if (!user || !password || !email) {
        return res.json({ error: "No user or password set" })
    }

    if (!securifyPath(user)) {
        return res.json({ error: "Username have to include alphabetic characters and numbers characters and _-" })
    }

    const userRootPath = `data/user/${user}/`

    if (fs.existsSync(userRootPath)) {
        return res.json({ error: `Username ${user} already exists` })
    }

    const userData = {

    }

    fs.mkdirSync(userRootPath, { recursive: true })
    fs.writeFileSync(userRootPath + "password.txt", hashPassword(password), "utf-8")
    fs.writeFileSync(userRootPath + "email.txt", email, "utf-8")
    fs.writeFileSync(userRootPath + "data.txt", JSON.stringify(userData), "utf-8")

})

app.post('/upload', upload.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded or invalid file type.');
    }

    res.json({
        message: 'File uploaded successfully.',
        id: req.file.filename,
    });
});

app.listen(port);