const express = require('express');
const router = express.Router();
const { initiateDutyCycle } = require('../controllers/assignmentController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/initiate', verifyToken, initiateDutyCycle);

module.exports = router;
