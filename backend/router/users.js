const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/users");

router.post("/login", usersControllers.Login);
router.post("/signup", usersControllers.Signup);
router.post("/:id", usersControllers.GetUserData);

module.exports = router;
