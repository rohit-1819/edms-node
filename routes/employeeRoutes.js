const express = require('express');
const router = express.Router();
const empCtrl = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, empCtrl.createEmployee);
router.get('/:hod_id', empCtrl.listEmployee);
router.put('/:emp_id', empCtrl.editEmployee);
router.put('/verify/:emp_id', empCtrl.verifyEmployee);
router.put('/unverify/:emp_id', empCtrl.unverifyEmployee);
router.get('/all/employees', empCtrl.allEmployees);
router.get('/departments/stats', empCtrl.departmentOverview);

module.exports = router;