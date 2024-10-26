const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchCategorySchema = new Schema({
    watch_uid: {
        type: String
    },
    Casual: {
        type: String
    },
    Business: {
        type: String
    },
    Occasion: {
        type: String
    }
})

module.exports = mongoose.model('categories', watchCategorySchema);