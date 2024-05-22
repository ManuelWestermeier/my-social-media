import { randomBytes } from 'crypto';
import multer from 'multer';
import path from 'path';
import fs from "fs";

function getRandomVideoId() {
    const id = randomBytes(8).toString("base64url")

    const dir = path.join('data', 'uploads', id);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    else return getRandomVideoId()

    return [id, dir]
}

export default function createUploadStorage() {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            var dir;
            [req.id, dir] = getRandomVideoId()

            cb(null, dir);
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname == "video" ? 'video.mp4'
                : file.fieldname == "cover" ? 'cover.jpg' :
                    "x.err");
        }
    });
}