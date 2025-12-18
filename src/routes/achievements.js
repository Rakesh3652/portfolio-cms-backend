const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getAchievements,
  createAchievement,
  deleteAchievement
} = require("../controllers/achievementsController");

router.get("/", getAchievements);
router.post("/", auth, createAchievement);
router.delete("/:id", auth, deleteAchievement);

module.exports = router;
