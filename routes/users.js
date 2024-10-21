const express = require("express");

const { getAllWatches, getWatchDetail, getWatchImage, getWatchCollections, editWatch } = require("../controllers/watchController");
const { createFanAccount, editFanAccount, getFanDetails, authenticateFanDetails } = require("../controllers/usersController");


const routes = express.Router();

routes.get("/favicon", (req, res, next) => {
  console.log("Favicon Called");
  res.send("<h1>WHy do you want favicon.ico??</h1>");
});

routes.get("/watches", getAllWatches);
routes.get("/watch-detail/:watchId", getWatchDetail);
routes.get("/watch-image/:watchId", getWatchImage);
routes.get("/watch-collections", getWatchCollections);
routes.post("/create-fan", createFanAccount);
routes.put("/fan-details/:id", getFanDetails);
routes.put("/edit-fan/:id", editFanAccount);
routes.get("/login", authenticateFanDetails)


exports.routes = routes;