const express = require("express");

const { getAllWatches, getWatchDetail, getWatchImage, getWatchCollections } = require("../controllers/watchController");
const { editFanAccount, getFanDetails, userAuthorization } = require("../controllers/usersController");


const routes = express.Router();

routes.get("/favicon", (req, res, next) => {
  console.log("Favicon Called");
  res.send("<h1>WHy do you want favicon.ico??</h1>");
});

routes.get("/watches", getAllWatches);
routes.get("/watch-detail/:watchId", userAuthorization, getWatchDetail);
routes.get("/watch-image/:watchId", getWatchImage);
routes.get("/watch-collections", getWatchCollections);
routes.put("/fan-details/:id", userAuthorization, getFanDetails);
routes.put("/edit-fan/:id", userAuthorization, editFanAccount);


exports.routes = routes;