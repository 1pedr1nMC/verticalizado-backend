const express = require("express");
const userController = require("./controllers/userController");
const locationController = require("./controllers/locationController");
const editalController = require("./controllers/editalController");
const router = express.Router();
router.get("/", (req, res) => {
  res.send("Hello World!");
});
router.post("/users/create", userController.create);
router.post("/users/recovery", userController.recovery);
router.post("/users/auth", userController.auth);
router.get("/users/getUserInfo", userController.getUserInfo);
router.put("/users/edit", userController.editUserController);
router.put("/users/delete", userController.deleteUserController);
router.put("/users/editPassword", userController.editPassword);
router.get("/location/citys", locationController.getCitys);
router.get("/location/states", locationController.getStates);
router.get("/location/citys/:id", locationController.getCityNameById);
router.get("/location/states/:id", locationController.getStateNameById);
router.get("/location/citys/state/:id", locationController.getCityByStateId);
router.post("/edital/create", editalController.insertEdital);
router.post("/edital/favorites", editalController.favoriteEdital);
router.get("/edital/favorites/:userId", editalController.getFavorites);
router.put("/edital/favorites", editalController.removeFavoriteEdital);

module.exports = router;
