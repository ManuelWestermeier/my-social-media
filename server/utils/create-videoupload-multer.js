import multer from 'multer';
import { login } from './login.js';

const fileFilter = (req, file, cb) => {
    if (!login(req)[0]) {
        return cb(null, false);
    }
    // Accept only JPG files
    if ((file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') && file.fieldname == "cover") {
        cb(null, true);
    }
    else if (file.mimetype == "video/mp4" && file.fieldname == "video") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};

// Initialize upload
export const createVideoUploadMulter = storage => multer({
    storage,
    fileFilter,
});

export const videoUploadFields = [
    {
        name: "cover",
        maxCount: 1
    },
    {
        name: "video",
        maxCount: 1
    }
]