

const express = require('express');
const postController = require('../controllers/postController');
const { verifyToken } = require('../middleware/validate');

const router = express.Router();

router.post('/', verifyToken, postController.createPost);
router.get('/', verifyToken, postController.getAllPosts);
router.get('/singlePost', verifyToken, postController.getPostById);  
router.put('/', verifyToken, postController.updatePost);
router.delete('/', verifyToken, postController.deletePost);

module.exports = router;
