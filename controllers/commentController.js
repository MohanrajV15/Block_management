const commentModel = require('../model/commentModel');


  const createComment = async (req, res) => {
    try {
        const { postId, commentText } = req.body;
        const userId = req.user.id;
        if (!postId || !commentText) {
           res.send('Post ID and comment are required');
        }
      await commentModel.createComment({ postId, userId, commentText });
      res.json({ message: 'Comment added successfully' });
    } catch (err) {
      console.error('Error creating comment:', err);
      res.json({ err: 'Failed to add comment' });
    }
  };

 const  getCommentsByPostId = async (req, res) => {
    try {
        const { postId } = req.query;   
        console.log(postId);
      if (!postId) {
     res.send('Post ID is required');
    }
      const comments = await commentModel.getCommentsByPostId(postId);
      res.json(comments);
    } catch (err) {
      console.log(err);
      res.status(500).json({ err: 'Failed to fetch comments' });
    }
  }


module.exports = {
    createComment,
    getCommentsByPostId
};
