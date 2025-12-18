const pool = require("../db");


exports.getAllProjects = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM projects ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};


exports.createProject = async (req, res) => {
  try {
    const { title, description, tech_stack, github_url, live_url } = req.body;

    const result = await pool.query(
      `INSERT INTO projects (title, description, tech_stack, github_url, live_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, description, tech_stack, github_url, live_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to create project" });
  }
};


exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tech_stack, github_url, live_url } = req.body;

    const result = await pool.query(
      `UPDATE projects
       SET title=$1, description=$2, tech_stack=$3, github_url=$4, live_url=$5
       WHERE id=$6
       RETURNING *`,
      [title, description, tech_stack, github_url, live_url, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to update project" });
  }
};


exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM projects WHERE id = $1", [id]);

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete project" });
  }
};

