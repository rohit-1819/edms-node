const express = require('express');
const router = express.Router();
const { fetchUser, createUser } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/:id', fetchUser);
router.post('/', verifyToken, createUser);

module.exports = router;
