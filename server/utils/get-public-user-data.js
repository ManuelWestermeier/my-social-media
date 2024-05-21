import fs from 'fs';

const getPublicUserData = (req, res) => {
    const user = (new URL("http://localhost" + req.url)).searchParams.get("user");

    if (!user) {
        return res.status(404).send("user-not-found");
    }

    const userRootPath = `data/user/${user}/`

    if (!fs.existsSync(userRootPath)) {
        return res.status(404).send("user-not-found");
    }

    const userData = JSON.parse(fs.readFileSync(userRootPath + "data.txt", "utf-8"))

    res.json({
        videos: userData.videos,
        description: userData.description,
        name: userData.name,
        follower: userData.follower,
    })
}

export default getPublicUserData;