import express from 'express';
import { createDiskStorage } from './utils/create-disk-storage.js';
import { createUploadMulter } from './utils/create-upload-multer.js';
import cors from "cors"
import { createUser } from './utils/create-user.js';
import { login } from './utils/login.js';
import { getUserData } from './utils/get-user-data.js';
import { sendProfileImage } from './utils/send-profile-image.js';
import { setUserData } from './utils/set-user-data.js';

const app = express();
const port = 3000;

const storage = createDiskStorage();
const upload = createUploadMulter(storage)

app.use(cors({ origin: "*" }))

app.get("/create-user", createUser)

app.get("/login", (req, res) => res.json(login(req)))

app.get("/get-user-data", getUserData)

app.get("/get-user-data", getUserData)

app.get("/set-user-data", setUserData)

app.get("/img/profile/:id", sendProfileImage)

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