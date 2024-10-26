const fs = require("fs");
const path = require("path");
const fan = require('../models/fan')
const argon = require("argon2")
const hashUtils = require("../utils/hash");

const subscribedUsersFilePath = path.resolve("./watchdata.json");
const fanDetails = ["fan_id", "username", "email", "favourites"]

exports.authenticateFanDetails = (req, res) => {
  fan.exists({
    username: req.body.username
  }).select('password_hash').then((resp) => {
    if (!resp) {
      return res.sendStatus(401);
    }
    hashUtils.verifyPassword(resp.password_hash, req.body.password).then((resp) => {
      console.log(resp);
      if (!resp) {
        return res.sendStatus(401);
      }
      req.session.authenticated = true
      console.log(req.session);
      res.sendStatus(200)
    }).catch(e => {
      console.error(e)
      res.sendStatus(401);
    })
  })
}

exports.getFanDetails = (req, res) => {
  fan.exists({
    fan_id: req.params.id
  }).select(fanDetails.join(' ')).then(resp => {
    res.send(resp).status(200);
  })
}

exports.createFanAccount = (req, res) => {
  console.log("Creating account");

  const fanDetails = {
    username: req.body.username,
    email: req.body.email,
    fan_id: req.body.fan_id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender
  }

  fan.exists({
    username: req.body.username,
    email: req.body.email
  }).then(resp => {
    console.log(resp);
    if (resp?.length) {
      console.log("FOrbidden");
      res.send(403)
    }
    hashUtils.hashPassword(req.body.password).then((resp) => {
      fan.create({ ...fanDetails, password_hash: resp }).then((resp) => {
        res.sendStatus(201);
      });
    })
  }).catch(e => {
    console.error(e);
    res.send(400);
  })
}

exports.editFanAccount = (req, res) => {
  fan.exists({
    fan_id: req.params.id
  }).select('fan_id').then(resp => {
    console.log(resp);
    if (resp.fan_id === req.params.id) {
      fan.updateOne({
        fan_id: req.params.id
      }, {
        email: req.body.email,
        name: req.body.name,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        favourites: req.body.favourites || []
      }).then((resp) => {
        console.log(resp);
        res.sendStatus(200);
      })
    }
    else {
      console.log(resp.fan_id, req.params.id);
      res.sendStatus(403);
    }
  })
}