const express = require("express");
const router = express.Router();

const dataController = require("../controllers/data");

router.get("/", dataController.getData);
router.get("/:id", dataController.getSpecificData);
router.post("/", dataController.postData);
router.put("/:id", dataController.modifyData);
router.delete("/:id", dataController.deleteData);

module.exports = router;
