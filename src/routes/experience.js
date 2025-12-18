const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} = require("../controllers/experienceController");

// PUBLIC
router.get("/", getAllExperience);

// ADMIN
router.post("/", authMiddleware, createExperience);
router.put("/:id", authMiddleware, updateExperience);
router.delete("/:id", authMiddleware, deleteExperience);

module.exports = router;
