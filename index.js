const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const mongoose = require('mongoose')

const { engine, mongoConnect, getMongoConnected, constants } = require("./utils/db");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/users");
const { ...tables } = require('./models/index');

const app = express();
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST", "PUT"],

  allowedHeaders: ["Content-Type"],
};


app.use(cors(corsOpts));
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.json());

app.use("/admin", adminRoutes.routes);
app.use("/", userRoutes.routes);

app.use("/", (req, res, next) => {
  res.status(404)
});

engine.sync({
  force: false,
  alert: true
}).then(result => {
  mongoose.connect(constants.mongo_url).then((client) => {
    console.log("Server Started!!")
    app.listen(3001);
  })
}).catch(err => console.error(err))

