// 1️⃣ Import required packages
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// 2️⃣ Import database connection
const pool = require("./db");

// 3️⃣ Import routes
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");
const skillRoutes = require("./routes/skills");
const experienceRoutes = require("./routes/experience");
const educationRoutes = require("./routes/education");
const achievementRoutes = require("./routes/achievements");
const aboutRoutes = require("./routes/about");
const contactRoutes = require("./routes/contact");
// 4️⃣ Create express app  ✅ MUST COME BEFORE app.use
const app = express();

// 5️⃣ Global middlewares
app.use(cors());              // allow frontend requests
app.use(express.json());      // allow JSON body

// 6️⃣ Test route (check server + DB)
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Backend running",
      db_time: result.rows[0].now,
    });
  } catch (err) {
    res.status(500).json({ message: "Database error" });
  }
});

// Optional test route (can remove later)
app.get("/api/auth/test", (req, res) => {
  res.send("AUTH ROUTE WORKING");
});

// 7️⃣ Register routes  ✅ AFTER app is created
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/contact", contactRoutes);
// 8️⃣ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
