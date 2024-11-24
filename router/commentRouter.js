const express = require('express');
const commentController = require('../controllers/commentController');
const { verifyToken } = require('../middleware/validate');

const router = express.Router();
router.post('/',verifyToken, commentController.createComment);
router.get('/', verifyToken,commentController.getCommentsByPostId);


module.exports = router;