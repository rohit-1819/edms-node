const db = require('../config/db');

const createPost = async (postData) => {
    const {
        title,
        content,
        image_url,  
        is_public,
        sender_id,
        recipient_ids = []
    } = postData;

    const postRes = await db.query(
        `INSERT INTO posts (title, content, image_url, is_public, sender_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [title, content, image_url, is_public, sender_id]
    );

    const post = postRes.rows[0];

    if (!is_public && recipient_ids.length > 0) {
        for (let id of recipient_ids) {
            await db.query(
                'INSERT INTO post_recipients (post_id, recipient_id) VALUES ($1, $2)',
                [post.post_id, id]
            );
        }
    }

    return post;
};

const getPublicPosts = async () => {
  const res = await db.query('SELECT * FROM posts WHERE is_public = true ORDER BY created_at DESC');
  return res.rows;
};

const getPersonalPostsForHOD = async (hod_id) => {
  const res = await db.query(
    `SELECT p.*
     FROM posts p
     JOIN post_recipients pr ON p.post_id = pr.post_id
     WHERE pr.recipient_id = $1
     ORDER BY p.created_at DESC`,
    [hod_id]
  );
  return res.rows;
};

module.exports = {
  createPost,
  getPublicPosts,
  getPersonalPostsForHOD
};

