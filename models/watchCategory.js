const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchCategorySchema = new Schema({
    watch_uid: {
        type: String
    }
})

module.exports = mongoose.model('categories', watchCategorySchema);