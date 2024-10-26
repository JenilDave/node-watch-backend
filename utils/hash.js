const argon = require('argon2');

const ARGON_CONFIG = {
    type: argon.argon2id, // Use Argon2id variant
    memoryCost: 2 ** 16, // Adjust memory cost as needed
    timeCost: 4, // Adjust time cost as needed
    parallelism: 1, // Adjust parallelism as needed
}

exports.verifyPassword =  (hashed_pass, pass) => new Promise(async (res, rej) => {
    try {
        const valid = await argon.verify(hashed_pass,pass);
        res(valid);
    }
    catch (e) {
        console.error(e);
        rej(e);
    }
})

exports.hashPassword = (rawPass) => argon.hash(rawPass, );