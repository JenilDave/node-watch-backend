const Sequelize = require('sequelize');
const { engine } = require('../utils/db')
const watch = require('./watch')

const watchCollection = engine.define(
    'watch_collection',
    {
        watch_id: {
            type: Sequelize.INTEGER,
            unique: true,
            references: {
                model: 'watches',
                key: 'id',
            }
        },
        is_casual: Sequelize.BOOLEAN,
        is_business: Sequelize.BOOLEAN,
        is_occasion: Sequelize.BOOLEAN,
    }
)


// watchCollection.hasOne(watch)


module.exports = watchCollection;