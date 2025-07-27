const pool = require("../config/db");

exports.getPollingStations = async (district, area) => {
  const query = `SELECT station_id FROM polling_stations WHERE district = $1 AND area = $2`;
  const { rows } = await pool.query(query, [district, area]);
  return rows;
};

exports.getEligibleEmployees = async (department, designation) => {
  const query = `
    SELECT * FROM employees
    WHERE department = $1 AND designation = $2 AND verified = TRUE AND emp_id NOT IN (
      SELECT emp_id FROM assignments
    )
  `;
  const { rows } = await pool.query(query, [department, designation]);
  return rows;
};

exports.assignDuties = async (assignments) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    for (const a of assignments) {
      await client.query(
        `INSERT INTO assignments (station_id, emp_id)
         VALUES ($1, $2)`,
        [a.station_id, a.employee_id]
      );
    }
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};
