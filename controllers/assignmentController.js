const { assignDuties } = require("../models/assignmentModel");

const initiateDutyCycle = async (req, res) => {
  try {
    const assignments = await assignDuties();

    if (assignments.length === 0) {
      return res.status(200).json({ message: "No duties assigned (possibly due to shortage of verified candidates)." });
    }

    res.status(200).json({ message: "Duties assigned successfully", assignments });
  } catch (error) {
    console.error("Error assigning duties:", error);
    res.status(500).json({ error: "Failed to assign duties" });
  }
};

module.exports = { initiateDutyCycle };