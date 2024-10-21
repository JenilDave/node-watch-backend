const argon = require('argon2');

const ARGON_CONFIG = {
    type: argon.argon2id, // Use Argon2id variant
    memoryCost: 2 ** 16, // Adjust memory cost as needed
    timeCost: 4, // Adjust time cost as needed
    parallelism: 1, // Adjust parallelism as needed
}

exports.verifyPassword = (pass, hashed_pass) => argon.verify(pass, hashed_pass)

exports.hashPassword = (rawPass) => argon.hash(rawPass, ARGON_CONFIG);