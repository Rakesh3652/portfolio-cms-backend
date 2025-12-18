const pool = require("../db");

// GET Contact Info (public)
exports.getContact = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contact_info LIMIT 1");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error fetching contact info" });
  }
};

// UPDATE Contact Info (admin)
exports.updateContact = async (req, res) => {
  try {
    const { email, phone, github_url, linkedin_url, address } = req.body;

    await pool.query(
      `UPDATE contact_info SET
        email=$1,
        phone=$2,
        github_url=$3,
        linkedin_url=$4,
        address=$5
      WHERE id=1`,
      [email, phone, github_url, linkedin_url, address]
    );

    res.json({ message: "Contact info updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update contact info" });
  }
};
