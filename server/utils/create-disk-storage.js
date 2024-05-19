import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { randomBytes } from 'crypto';

const destination = (req, file, cb) => {
  const uploadPath = 'data/upload/';
  
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  cb(null, uploadPath);
};

export const createDiskStorage = () => multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const id = randomBytes(20).toString("base64url")

    cb(null, `${id}${path.extname(file.originalname)}`);
  }
});