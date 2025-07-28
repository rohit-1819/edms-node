const db = require('../config/db');

const getPollingStations = async (district, area) => {
  const query = `SELECT station_id FROM polling_stations WHERE district = $1 AND area = $2`;
  const { rows } = await pool.query(query, [district, area]);
  return rows;
};

const getEligibleEmployees = async (department, designation) => {
  const query = `
    SELECT * FROM employees
    WHERE department = $1 AND designation = $2 AND verified = TRUE AND emp_id NOT IN (
      SELECT emp_id FROM assignments
    )
  `;
  const { rows } = await pool.query(query, [department, designation]);
  return rows;
};

const assignDuties = async () => {
  const assigned = [];

  const { rows: requirements } = await db.query(`SELECT * FROM duty_requirements`);

  for (const req of requirements) {
    const { station_id, department, designation, required_count } = req;
    
    const { rows: candidates } = await db.query(
      `SELECT e.emp_id FROM employees e
      LEFT JOIN assignments a ON e.emp_id = a.emp_id
      WHERE a.emp_id IS NULL
      AND e.department = $1
      AND e.designation = $2
      AND e.verified = TRUE
      LIMIT $3`,
      [department, designation, required_count]
    );

    if (candidates.length < required_count) {
      console.warn(`Not enough candidates for ${designation} in ${department} at polling station ${station_id}`);
      continue;
    }

    for (const candidate of candidates) {
      await db.query(
        `INSERT INTO assignments (emp_id, station_id) VALUES ($1, $2)`,
        [candidate.emp_id, station_id]
      );
      assigned.push({ emp_id: candidate.emp_id, station_id });
    }
  }
  return assigned;
};

module.exports = {
  assignDuties,
  getPollingStations,
  getEligibleEmployees
};