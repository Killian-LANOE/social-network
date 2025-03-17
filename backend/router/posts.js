const express = require("express");
const router = express.Router();
const postsControllers = require("../controllers/posts");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", auth, postsControllers.getPosts);
router.get("/:id", auth, postsControllers.getSinglePost);
router.post("/", auth, multer, postsControllers.createPost);
router.delete("/:id", auth, postsControllers.deletePost);
router.put("/:id", auth, multer, postsControllers.modifyPost);

module.exports = router;
