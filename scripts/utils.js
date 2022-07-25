const crypto = require("crypto")

const randomString = (len) => {
    let buffer = Buffer.alloc(len)
    return crypto.randomFillSync(buffer).toString('hex').slice(0, len)
}
exports.randomString = randomString