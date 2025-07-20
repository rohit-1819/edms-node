const express = require('express');
const router = express.Router();
const { createHODAccount } = require('../controllers/hodController');

router.post('/hod', createHODAccount);

module.exports = router;