const employeeModel = require('../models/employeeModel');
const { getUserByID } = require('../models/userModel');

const createEmployee = async (req, res) => {
    try {
        const hod_id = req.user.user_id;
        const hod = await getUserByID(hod_id);

        if (!hod || hod.role !== 'HOD') {
            return res.status(403).json({ error: "Unauthorized action" });
        }

        const { name, email, phone, designation } = req.body;
        const department = hod.department;
        const created_by = hod_id;

        
        const emp = await employeeModel.createEmployee({
            name,
            email,
            phone,
            department,
            designation,
            created_by
        });
        res.status(201).json(emp);
    }
    catch (err) {
        console.error("Employee creation error:", err);
        res.status(500).json({ error: "Server error" });
    }
};

const listEmployee = async (req, res) => {
    try {
        const employee = await employeeModel.getEmployeeByHOD(req.params.hod_id);
        res.json(employee);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

const editEmployee = async (req, res) => {
    try {
        const updated = await employeeModel.updateEmployee(req.params.emp_id, req.body);
        res.json(updated);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

const verifyEmployee  = async (req, res) => {
    try {
        const updated = await employeeModel.setVerification(req.params.emp_id, true);
        res.json(updated);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

const unverifyEmployee = async (req, res) => {
    try {
        const updated = await employeeModel.setVerification(req.params.emp_id, false);
        res.json(updated);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

const allEmployees = async (req, res) => {
    try {
        const employees = await employeeModel.getAllEmployees();
        res.json(employees);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const departmentOverview = async (req, res) => {
    try {
        const stats = await employeeModel.getDepartmentDistribution();
        res.json(stats);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    createEmployee,
    listEmployee,
    editEmployee,
    verifyEmployee,
    unverifyEmployee,
    allEmployees,
    departmentOverview
};