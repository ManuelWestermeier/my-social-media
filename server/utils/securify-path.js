const allowedPathChars = "qwertzuiopasdfghjklyxcvbnmüöäQWERTZUIOPÜASDFGHJKLÖÄYXCVBNM-_1234567890"

export default function securifyPath(path = "") {
    for (let index = 0; index < path.length; index++) {
        if (!allowedPathChars.includes(path[index])) {
            return false
        }
    }

    return true
}