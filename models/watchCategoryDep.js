const { getMongoConnected } = require('../utils/db')
const mongodb = require('mongodb')

class watchCategory {

    constructor(watch_uid, category_flags) {
        this.watch_uid = watch_uid
        this.category_flags = category_flags
    }

    static updateOne(watchUID, payload) {
        const db = getMongoConnected();
        console.log(watchUID);
        return db.collection('categories').updateOne(
            {
                watch_uid: watchUID
            },
            {
                $set: payload
            }
        )
    }

    static findOne(watchUID) {
        const db = getMongoConnected();
        return db.collection('categories').findOne(
            {
                watch_uid: watchUID
            }
        )
    }

    save() {
        const db = getMongoConnected();
        return db.collection('categories').insertOne(
            {
                watch_uid: this.watch_uid,
                ...this.category_flags
            }
        )
    }

}

module.exports = watchCategory