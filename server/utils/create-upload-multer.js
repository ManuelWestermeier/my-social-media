import multer from 'multer';
import path from 'path';

export const createUploadMulter = storage => multer({
    fileFilter: (req, file, cb) => {
        const filetypes = /mp4|avi|mkv|mov/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.
            test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb(new Error('File upload only supports the following video filetypes - ' + filetypes));
    },
});