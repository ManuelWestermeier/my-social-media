import express from 'express';
import { createDiskStorage } from './utils/create-disk-storage.js';
import { createUploadMulter } from './utils/create-upload-multer.js';
import cors from "cors"

const app = express();
const port = 3000;

const storage = createDiskStorage();
const upload = createUploadMulter(storage)

app.use(cors({ origin: "*" }))

app.post('/upload', upload.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded or invalid file type.');
    }

    res.json({
        message: 'File uploaded successfully.',
        file: {
            originalName: req.file.originalname,
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size,
            mimetype: req.file.mimetype,
        }
    });
});

app.listen(port);