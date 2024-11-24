const db = require('../config/db'); 

  createComment = async ({ postId, userId, commentText }) => {
    const query = `
      INSERT INTO comments (post_id, user_id, comment_text)
      VALUES (?, ?, ?)
    `;
    return db.execute(query, [postId, userId, commentText]);
  },


  getCommentsByPostId = async (postId) => {
    const query = `
      SELECT 
        comments.id, 
        comments.comment_text, 
        users.name AS user, 
        comments.created_at 
      FROM comments 
      INNER JOIN users ON comments.user_id = users.id
      WHERE comments.post_id = ?
      ORDER BY comments.created_at DESC
    `;
    const [rows] = await db.execute(query, [postId]);
    return rows;
  };

module.exports = {
    createComment,
    getCommentsByPostId
}
