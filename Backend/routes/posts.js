const express = require("express");
const multer = require("../middleware/multer");
const auth = require("../middleware/auth");
const router = express.Router();

const postsControllers = require("../controllers/posts");

router.get("/", auth, postsControllers.getPosts);
router.post("/", auth, multer, postsControllers.createPost);

module.exports = router;
