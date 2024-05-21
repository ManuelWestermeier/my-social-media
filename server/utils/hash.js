import crypto from "crypto";

export function hashPassword(password = "") {
    return crypto.createHash('sha1').update(password).digest('hex');
}