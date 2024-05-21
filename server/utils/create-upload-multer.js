import multer from 'multer';
import { login } from './login.js';

// Multer file filter to allow only JPG files
const fileFilter = (req, file, cb) => {
    if (!login(req)) {
        return cb(null, false);
    }

    // Accept only JPG files
    if (file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(new Error('Only JPG files are allowed!'), false);
    }
};

// Initialize upload
export const createUploadMulter = storage => multer({
    storage,
    fileFilter
});