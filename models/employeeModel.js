const db = require('../config/db');

const createEmployee = async ({ name, email, phone, department, designation, created_by }) => {
    
    const result = await db.query(
        `INSERT INTO employees (name, email, phone, department, designation, created_by)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [name, email, phone, department, designation, created_by]
    );

    return result.rows[0];
};

const getEmployeeByHOD = async (hod_id) => {
    const result = await db.query(
        `SELECT * FROM employees WHERE created_by = $1 ORDER BY emp_id`,
        [hod_id]
    );
    return result.rows;
};

const updateEmployee = async (id, data) => {
    const { name, email, phone } = data;
    const result = await db.query(
        `UPDATE employees SET name=$1, email=$2, phone=$3 WHERE emp_id=$4 RETURNING *`,
        [name, email, phone, id]
    );
    return result.rows[0];
};

const setVerification = async (id, verified) => {
    const result = await db.query(
        `UPDATE employees SET is_verified=$1 WHERE emp_id=$2 RETURNING *`,
        [verified, id]
    );
    return result.rows[0];
};

const getAllEmployees = async () => {
    const result = await db.query(
        `SELECT e.*, u.name AS hod_name
        FROM employees e
        JOIN users u ON e.created_by = u.user_id
        ORDER BY e.emp_id`
    );
    return result.rows;
}

const getDepartmentDistribution = async () => {
    const result = await db.query(
        `SELECT department, COUNT(*) AS total
        FROM employees
        GROUP BY department
        ORDER BY department`
    );
    return result.rows;
}

module.exports = {
    createEmployee,
    getEmployeeByHOD,
    updateEmployee,
    setVerification,
    getAllEmployees,
    getDepartmentDistribution
};