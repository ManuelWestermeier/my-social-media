import multer from 'multer';
import { login } from './login.js';

// Multer file filter to allow only JPG files
const fileFilter = (req, file, cb) => {
    if (!login(req)[0]) {
        return cb(null, false);
    }

    // Accept only JPG files
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// Initialize upload
export const createUploadMulter = storage => multer({
    storage,
    fileFilter
});