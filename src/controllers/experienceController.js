const pool = require("../db");

// GET all experience (PUBLIC)
exports.getAllExperience = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM experience ORDER BY start_date DESC"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch experience" });
  }
};

// CREATE experience (ADMIN)
exports.createExperience = async (req, res) => {
  try {
    const { role, company, start_date, end_date, description } = req.body;

    const result = await pool.query(
      `INSERT INTO experience (role, company, start_date, end_date, description)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [role, company, start_date, end_date, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to create experience" });
  }
};

// UPDATE experience (ADMIN)
exports.updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, company, start_date, end_date, description } = req.body;

    const result = await pool.query(
      `UPDATE experience
       SET role=$1, company=$2, start_date=$3, end_date=$4, description=$5
       WHERE id=$6
       RETURNING *`,
      [role, company, start_date, end_date, description, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to update experience" });
  }
};

// DELETE experience (ADMIN)
exports.deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM experience WHERE id = $1", [id]);

    res.json({ message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete experience" });
  }
};
