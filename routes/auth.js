const express = require('express')
const { createFanAccount, authenticateFanDetails } = require("../controllers/usersController");

const routes = express.Router();


routes.post("/login", authenticateFanDetails)
routes.post("/create-fan", createFanAccount);

exports.routes = routes