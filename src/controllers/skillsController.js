const pool = require("../db");

// GET all skills (PUBLIC)
exports.getAllSkills = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM skills ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch skills" });
  }
};

// CREATE skill (ADMIN ONLY)
exports.createSkill = async (req, res) => {
  try {
    const { name, level, category } = req.body;

    const result = await pool.query(
      `INSERT INTO skills (name, level, category)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, level, category]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to create skill" });
  }
};

// UPDATE skill (ADMIN ONLY)
exports.updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, level, category } = req.body;

    const result = await pool.query(
      `UPDATE skills
       SET name=$1, level=$2, category=$3
       WHERE id=$4
       RETURNING *`,
      [name, level, category, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to update skill" });
  }
};

// DELETE skill (ADMIN ONLY)
exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM skills WHERE id = $1", [id]);

    res.json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete skill" });
  }
};
