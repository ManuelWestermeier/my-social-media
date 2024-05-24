import fs from 'fs';

export var videoSearchItems = fs.readdirSync("data/uploads").map(id => {
    const videoData = JSON.parse(fs.readFileSync(`data/uploads/${id}/data.txt`, "utf8"));
    return {
        id,
        search: (videoData?.title + " " + videoData?.description).toLocaleLowerCase()
    }
})

export function setVideoSearchItems(_new) {
    videoSearchItems = _new
}

export default function search(req, res) {
    if (!req.query.search) {
        return res.json([])
    }

    const results = []
    if (req.query.search.replace(/ /g, "") == "") {
        return res.json(videoSearchItems.slice(0, 5))
    }

    const searchWords = [...new Set(req.query.search.toLowerCase().split(" "))]

    for (let index = 0; index < videoSearchItems.length; index++) {
        if (results.length == 100) {
            return res.json(results)
        }

        var include = true

        for (let wordIndex = 0; wordIndex < searchWords.length; wordIndex++) {
            if (!videoSearchItems[index].search.includes(searchWords[wordIndex])) {
                include = false
                break
            }
        }

        if (include) {
            results.push(videoSearchItems[index].id)
        }
    }

    res.json(results)
}