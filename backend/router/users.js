const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/users");
const auth = require("../middleware/auth");

router.post("/login", usersControllers.Login);
router.post("/signup", usersControllers.Signup);
router.get("/:username", auth, usersControllers.GetUserData);

module.exports = router;
