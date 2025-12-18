const pool = require("../db");

// GET (PUBLIC)
exports.getEducation = async (req, res) => {
  const result = await pool.query("SELECT * FROM education ORDER BY id DESC");
  res.json(result.rows);
};

// CREATE (ADMIN)
exports.createEducation = async (req, res) => {
  const { degree, institution, year, description } = req.body;

  const result = await pool.query(
    `INSERT INTO education (degree, institution, year, description)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [degree, institution, year, description]
  );

  res.status(201).json(result.rows[0]);
};

// DELETE (ADMIN)
exports.deleteEducation = async (req, res) => {
  await pool.query("DELETE FROM education WHERE id=$1", [req.params.id]);
  res.json({ message: "Education deleted" });
};
