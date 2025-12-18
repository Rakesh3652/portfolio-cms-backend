const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { getContact, updateContact } = require("../controllers/contactController");

router.get("/", getContact);
router.put("/", auth, updateContact);

module.exports = router;
