const Sequelize = require('sequelize');
const { engine } = require('../utils/db');

const watch = engine.define(
    'watch',
    {
        uid: {
            type: Sequelize.STRING,
            unique: true
        },
        watch_name: Sequelize.STRING,
        color: Sequelize.STRING,
        img_path: Sequelize.STRING,
        company: Sequelize.STRING
    },
    {
        indexes: [
            {
                name: "idx_watch_uid",
                fields: [
                    'uid'
                ]
            }
        ]
    }
)


module.exports = watch