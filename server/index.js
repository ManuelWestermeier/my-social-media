import express from 'express';
import { createDiskStorage } from './utils/create-disk-storage.js';
import { createUploadMulter } from './utils/create-upload-multer.js';
import cors from "cors"
import { createUser } from './utils/create-user.js';
import { login } from './utils/login.js';
import { getUserData } from './utils/get-user-data.js';
import { sendProfileImage } from './utils/send-profile-image.js';
import { setUserData } from './utils/set-user-data.js';
import uploadProfileImage from './utils/upload-profile-image.js';
import getPublicUserData from './utils/get-public-user-data.js';
import toggleSubscribtion from './utils/toggle-subscription.js';
import getUserName from './utils/get-user-name.js';

const app = express();
const port = 3000;

const profileImageStorage = createDiskStorage();
const profileImageUpload = createUploadMulter(profileImageStorage)

app.use(cors({ origin: "*" }))

app.get("/create-user", createUser)

app.get("/login", (req, res) => res.json(login(req)))

app.get("/get-user-data", getUserData)

app.get("/get-user-data", getUserData)

app.get("/set-user-data", setUserData)

app.get("/img/profile/:id", sendProfileImage)

app.get("/get-public-user-data", getPublicUserData)

app.get("/get-user-name", getUserName)

app.get("/toggle-subscription", toggleSubscribtion)

app.post("/upload-profile-image", profileImageUpload.single('image'), uploadProfileImage);

app.listen(port);