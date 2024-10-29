const argon = require('argon2');
const jwt = require('jsonwebtoken')

const ARGON_CONFIG = {
    type: argon.argon2id, // Use Argon2id variant
    memoryCost: 2 ** 16, // Adjust memory cost as needed
    timeCost: 4, // Adjust time cost as needed
    parallelism: 1, // Adjust parallelism as needed
}

const JWT_SECRET = "TOP_$3CR3T"

exports.verifyPassword = (hashed_pass, pass) => new Promise(async (resolve, reject) => {
    try {
        const valid = await argon.verify(hashed_pass, pass, ARGON_CONFIG);
        resolve(valid);
    }
    catch (e) {
        console.error(e);
        reject(e);
    }
})

exports.hashPassword = (rawPass) => argon.hash(rawPass, ARGON_CONFIG);

exports.generateJwt = username => new Promise(async (resolve, reject) => {
    try {
        const token = await jwt.sign({
            userId: username
        },
            JWT_SECRET,
            { expiresIn: '1h' }
        )
        resolve(token)
    }
    catch (e) {
        console.error(e);
        reject(e);
    }
})

exports.verifyJwt = (token) => new Promise(async (resolve, reject) => {
    try {
        const isVerified = await jwt.verify(token, JWT_SECRET)
        resolve(isVerified);
    }
    catch (e) {
        console.error(e);
        reject(e);
    }
})