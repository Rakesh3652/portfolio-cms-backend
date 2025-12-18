const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getEducation,
  createEducation,
  deleteEducation
} = require("../controllers/educationController");

router.get("/", getEducation);
router.post("/", auth, createEducation);
router.delete("/:id", auth, deleteEducation);

module.exports = router;
