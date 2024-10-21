const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fanSchema = new Schema({
    fan_id: {
        type: String,
        unique: true,
        index: true
    },
    username: {
        type: String,
        index: true
    },
    email: {
        type: String,
        index: true
    },
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    password_hash: {
        type: String
    },
    favourites: {
        type: [String]
    }
})

module.exports = mongoose.model('fan', fanSchema);