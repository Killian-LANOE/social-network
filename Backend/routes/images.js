const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer");

const imagesControllers = require("../controllers/images");

router.get("/", imagesControllers.getImages);
router.post("/upload", multer, imagesControllers.uploadImages);

module.exports = router;
