const Sequelize = require('sequelize');
const { engine } = require('../utils/db');

const collection = engine.define(
    'collection',
    {
        collection_name: {
            type: Sequelize.STRING,
            unique: true
        }
    }
);

module.exports = collection;