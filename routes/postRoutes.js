const express = require('express');
const router = express.Router();
const {
  sendPost,
  fetchPublicPosts,
  fetchPersonalPosts
} = require('../controllers/postController');

router.post('/', sendPost);                        // DM sends post
router.get('/public', fetchPublicPosts);           // HOD views all public
router.get('/personal/:hod_id', fetchPersonalPosts); // HOD views personal

module.exports = router;
