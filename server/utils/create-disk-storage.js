import multer from 'multer';
import path from 'path';

export const createDiskStorage = () => multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join('data', 'user', (new URL("http:localhost/" + req.url)).searchParams.get("user"));
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, 'profile.jpg');
  }
});