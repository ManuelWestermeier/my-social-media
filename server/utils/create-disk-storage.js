import multer from 'multer';
import path from 'path';

export const createDiskStorage = () => multer.diskStorage({
  destination: (req, file, cb) => {
    const user = (new URL("http:localhost/" + req.url)).searchParams.get("user")

    const dir = path.join('data', 'user', user);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, 'profile.jpg');
  }
});