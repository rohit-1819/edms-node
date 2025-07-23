const { getPollingStations, getEligibleEmployees, assignDuties } = require("../models/assignmentModel");

const initiateDutyCycle = async (req, res) => {
  try {
    const { district, area, designationRequirements } = req.body;

    // Step 1: Fetch polling stations
    const pollingStations = await getPollingStations(district, area);

    // Step 2: Get eligible employees for each designation
    const allAssignments = [];
    for (const station of pollingStations) {
      for (const dept in designationRequirements) {
        const required = designationRequirements[dept];

        for (const desig of required) {
          const eligible = await getEligibleEmployees(dept, desig);
          if (!eligible.length) continue;

          const selected = eligible[Math.floor(Math.random() * eligible.length)];

          allAssignments.push({
            polling_station_id: station.id,
            employee_id: selected.emp_id,
            designation: desig
          });
        }
      }
    }

    // Step 3: Save assignments
    await assignDuties(allAssignments);

    res.status(201).json({ message: "Duties assigned successfully", assignments: allAssignments });
  } catch (error) {
    console.error("Duty assignment error:", error);
    res.status(500).json({ error: "Failed to assign duties" });
  }
};

module.exports = { initiateDutyCycle };