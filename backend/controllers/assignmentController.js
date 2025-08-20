const { assignDuties } = require("../models/assignmentModel");

const initiateDutyCycle = async (req, res) => {
  try {

    console.log("Duty assignment started");
    const assignments = await assignDuties();
    console.log("Assignments result:", assignments);

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