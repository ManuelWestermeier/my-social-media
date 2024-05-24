import fs from 'fs';

export const videoSearchItems = fs.readdirSync("data/uploads").map(id => {
    const videoData = JSON.parse(fs.readFileSync(`data/uploads/${id}/data.txt`, "utf8"));
    return {
        id,
        search: (videoData?.title + " " + videoData?.description).toLocaleLowerCase()
    }
})

export default function search(req, res) {
    if (!req.query.search) {
        return res.json([])
    }

    const results = []

    const searchWords = [...new Set(req.query.search.toLowerCase().split(" "))]

    for (let index = 0; index < videoSearchItems.length; index++) {
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