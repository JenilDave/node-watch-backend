const express = require('express')
const { createFanAccount, authenticateFanDetails } = require("../controllers/usersController");

const routes = express.Router();


routes.post("/login", authenticateFanDetails)
routes.post("/create-fan", createFanAccount);
routes.use("/", (req, res, next) => {
    console.log(req.session);
    if (req.session.authenticated === true) {
      next();
    }
    else {
      res.sendStatus(401);
    }
})

exports.routes = routes