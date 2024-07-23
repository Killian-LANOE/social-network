const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const userController = require("../controllers/users");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/:id", auth, userController.getUser);

module.exports = router;
