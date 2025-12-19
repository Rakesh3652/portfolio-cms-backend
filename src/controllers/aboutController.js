const pool = require("../db");

// GET About (public)
exports.getAbout = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM about LIMIT 1");
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: "Error loading about data" });
  }
};

// UPDATE About (admin)
exports.updateAbout = async (req, res) => {
  try {
    const { hero_title, hero_subtitle, about_text, profile_image_url } = req.body;

    // Check if row exists
    const existing = await pool.query("SELECT id FROM about LIMIT 1");

    if (existing.rows.length === 0) {
      // INSERT new row
      await pool.query(
        `INSERT INTO about (hero_title, hero_subtitle, about_text, profile_image_url)
         VALUES ($1, $2, $3, $4)`,
        [hero_title, hero_subtitle, about_text, profile_image_url]
      );
    } else {
      // UPDATE existing row
      const aboutId = existing.rows[0].id;

      await pool.query(
        `UPDATE about SET 
          hero_title=$1,
          hero_subtitle=$2,
          about_text=$3,
          profile_image_url=$4
        WHERE id=$5`,
        [hero_title, hero_subtitle, about_text, profile_image_url, aboutId]
      );
    }

    res.json({ message: "About updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update about" });
  }
};
