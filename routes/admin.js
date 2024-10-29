const express = require("express");

const {
  editWatch,
} = require("../controllers/watchController");


const { getUserDetails, userAuthorization } = require("../controllers/usersController");
const { addWatch } = require("../controllers/watchController");

const routes = express.Router();

const data = [];

routes.put("/edit-watch/:watchId", userAuthorization, editWatch);
routes.post("/watch", userAuthorization, addWatch);

exports.routes = routes;
exports.products = data;
