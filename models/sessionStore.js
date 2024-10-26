const Sequelize = require('sequelize');
const { engine, constants } = require('../utils/db');
const session = require('express-session')
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sessionStore = engine.define(
    constants.session_store,
    {
        sid: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        userId: Sequelize.STRING,
        expires: Sequelize.DATE,
        data: Sequelize.TEXT,
        // checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
        // expiration: 24 * 60 * 60 * 1000  // The maximum age (in milliseconds) of a valid session.
    }
)

// console.log(sessionStore.createTable);

const extendDefaultFields = (defaults, session) => {
    return {
        data: defaults.data,
        expires: defaults.expires,
        userId: session.userId,
    };
}

exports.sessionStore = sessionStore