const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/users");

router.post("/login", usersControllers.Login);
router.post("/signup", usersControllers.Signup);
router.get("/:username", usersControllers.GetUserData);

module.exports = router;
