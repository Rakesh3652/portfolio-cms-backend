const pool = require("../db");

// GET (PUBLIC)
exports.getAchievements = async (req, res) => {
  const result = await pool.query("SELECT * FROM achievements ORDER BY id DESC");
  res.json(result.rows);
};

// CREATE (ADMIN)
exports.createAchievement = async (req, res) => {
  const { title, description, year } = req.body;

  const result = await pool.query(
    `INSERT INTO achievements (title, description, year)
     VALUES ($1, $2, $3) RETURNING *`,
    [title, description, year]
  );

  res.status(201).json(result.rows[0]);
};

// DELETE (ADMIN)
exports.deleteAchievement = async (req, res) => {
  await pool.query("DELETE FROM achievements WHERE id=$1", [req.params.id]);
  res.json({ message: "Achievement deleted" });
};
