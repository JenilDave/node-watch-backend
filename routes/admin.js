const express = require("express");

const {
  editWatch,
} = require("../controllers/watchController");


const { getUserDetails } = require("../controllers/usersController");
const { addWatch } = require("../controllers/watchController");

const routes = express.Router();

const data = [];

routes.put("/edit-watch/:watchId", editWatch);
routes.post("/watch", addWatch);

exports.routes = routes;
exports.products = data;
