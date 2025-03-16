const express = require("express");
const router = express.Router();
const postsControllers = require("../controllers/posts");

router.get("/", postsControllers.getPosts);
router.get("/:id", postsControllers.getSinglePost);
router.post("/", postsControllers.createPost);
router.delete("/:id", postsControllers.deletePost);
router.put("/:id", postsControllers.modifyPost);

module.exports = router;
