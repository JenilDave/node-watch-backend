const express = require('express')
const { check } = require('express-validator')
const { createFanAccount, authenticateFanDetails } = require("../controllers/usersController");

const routes = express.Router();


routes.post("/login", check('email').isEmail(),authenticateFanDetails)
routes.post("/create-fan", check('email').isEmail() ,createFanAccount);

exports.routes = routes