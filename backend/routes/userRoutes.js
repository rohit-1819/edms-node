const express = require('express');
const router = express.Router();
const { fetchUser, createUser, fetchHODs } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/:id', fetchUser);
router.post('/', verifyToken, createUser);
router.get('/role/hods', verifyToken, fetchHODs);

module.exports = router;
