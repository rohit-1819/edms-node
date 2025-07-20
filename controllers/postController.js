const {
    createPost,
    getPublicPosts,
    getPersonalPostsForHOD
} = require('../models/postModel');

const db = require('../config/db');

const validateRecipientsExist = async (ids) => {
    const res = await db.query(
        'SELECT user_id FROM users WHERE user_id = ANY($1)',
        [ids]
    );
    return res.rows.map(row => row.user_id);
};

const sendPost = async (req, res) => {

    const validIds = await validateRecipientsExist(req.body.recipient_ids);
    // const invalidIds = req.body.recipient_ids.filter(id => !validIds.includes(id));

    const invalidIds = Array.isArray(req.body.recipient_ids) 
    ? req.body.recipient_ids.filter(id => typeof id === 'number')
    : [];

    if (invalidIds.length > 0) {
        return res.status(400).json({ error: `Invalid recipient IDs: ${invalidIds.join(', ')}` });
    }

    try {
        const post = await createPost(req.body);
        res.status(201).json(post);
    } catch (err) {
        console.error("Post creation error:", err);
        res.status(500).json({ error: 'Server error' });
    }
};

const fetchPublicPosts = async (req, res) => {
    try {
        const posts = await getPublicPosts();
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const fetchPersonalPosts = async (req, res) => {
    try {
        const hod_id = req.params.hod_id;
        const posts = await getPersonalPostsForHOD(hod_id);
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    sendPost,
    fetchPublicPosts,
    fetchPersonalPosts
};