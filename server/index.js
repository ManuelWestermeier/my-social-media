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
import uploadVideo from './utils/upload-video.js';
import createUploadStorage from './utils/create-upload-storage.js';
import { createVideoUploadMulter, videoUploadFields } from './utils/create-videoupload-multer.js';
import randomVideo from './utils/random-video.js';
import toggleLikeVideo from './utils/toggle-like-video.js';
import addComment from './utils/add-comment.js';
import addView from './utils/add-view.js';
import search from './utils/search.js';
import deleteComment from './utils/delete-comment.js';
import deleteVideo from './utils/delete-video.js';

const app = express();
const port = 3000;

const profileImageStorage = createDiskStorage();
const profileImageUpload = createUploadMulter(profileImageStorage)

const videoUploadStorage = createUploadStorage();
const videoUpload = createVideoUploadMulter(videoUploadStorage);

app.use(cors({ origin: "*" }))

app.use('/videos/', express.static('data/uploads'));

app.get("/create-user", createUser)

app.get("/login", (req, res) => res.json(login(req)))

app.get("/get-user-data", getUserData)

app.get("/get-user-data", getUserData)

app.get("/set-user-data", setUserData)

app.get("/img/profile/:id", sendProfileImage)

app.get("/get-public-user-data", getPublicUserData)

app.get("/get-user-name", getUserName)

app.get("/toggle-subscription", toggleSubscribtion)

app.get("/random-video", randomVideo)

app.post("/upload-video", videoUpload.fields(videoUploadFields), uploadVideo);

app.get("/delete-video", deleteVideo)

app.post("/upload-profile-image", profileImageUpload.single('image'), uploadProfileImage);

app.get("/toggle-like-video", toggleLikeVideo)

app.get("/add-comment", addComment)

app.get("/delete-comment", deleteComment)

app.get("/add-view", addView)

app.get("/search", search)

app.listen(port);