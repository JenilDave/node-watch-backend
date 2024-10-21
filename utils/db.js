const mysql = require('mysql2');
const Sequelize = require('sequelize');
const mongodb = require('mongodb');
const mongoEngine = mongodb.MongoClient

const mUID = "admin";
const mPASS = "Sec$2610"
const MONGOURL = `mongodb+srv://${mUID}:${mPASS}@node-tutorial.rpttn.mongodb.net/?retryWrites=true&w=majority&appName=node-tutorial`
const MONGO_COLLECTION_NAME = 'categories'

let _db;

const mongoConnect = (callback) => {
    mongoEngine.connect(MONGOURL)
        .then((client) => {
            console.log("Connected Mongo");
            _db = client.db()
            callback();
        }).catch((err) => {
            console.error(err);
        })
}

const engine = new Sequelize('node_watch', 'root', 'Sec$2610', {
    dialect: 'mysql',
    host: '127.0.0.1',
    logging: false
});

const getMongoConnected = () => {
    if (_db) {
        return _db
    }
    else {
        throw 'Mongo Connection Failed'
    }
}

module.exports = {
    engine,
    mongoConnect,
    getMongoConnected,
    constants : {
        watches: "watches",
        mongo_collection_name: 'categories',
        readLimit: 10,
        mongo_url: MONGOURL
    }
}

// exports.getMongoConnected = getMongoConnected;

// exports.pool = mysql.createConnection({
//     host: "127.0.0.1",
//     user: "root",
//     database: "node_watch",
//     password: "Sec$2610"
// }).promise();

