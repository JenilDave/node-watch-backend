const watch = require('./watch');
const collection = require('./collection');
const watchCollection = require('./watchCollection');
const sessionStore = require("./sessionStore")


module.exports.tables = {
    watch,
    collection,
    watchCollection,
    sessionStore
}
