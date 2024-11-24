const postModel = require('../model/postModel');

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id; 
  try {
    await postModel.createPost({ title, content, userId });
    res.json({ message: 'Post Created Successfully' });
  } catch (err) {
    res.json({ err: 'Server error' });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const offset = (page - 1) * limit; 
    const posts = await postModel.getAllPosts( limit, offset, search );
    const total = await postModel.getTotalPosts(search);
    res.json({
      data: posts,
      total, 
      page: parseInt(page, 10), 
      limit: parseInt(limit, 10), 
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.json({ err: 'Failed to fetch posts' });
  }
};




  const getPostById = async (req, res) => {
    try {
      const { id } = req.query;
      const post = await postModel.getPostById(id);
      if (!post) {
        res.send('Post Not Available');
      }      
      res.json(post);
    } catch (err) {
      res.json({ err: 'Failed to fetch post' });
    }
  };

const updatePost = async (req, res) => {
  try {
    const { id } = req.query;
  const { title, content } = req.body;
    const result = await postModel.updatePost(id, title, content, req.user.id); 
    if (!result) {
       res.send('Post Not Available');
    }
    res.json({ message: 'Post Updated Successfully' });
  } catch (err) {
    res.json({ err: 'Failed to Update Post' });
  }
};


const deletePost = async (req, res) => {
  try {
    const { id } = req.query;
    const result = await postModel.deletePost(id, req.user.id); 
    if (!result) {
       res.send('Post Not Available ');
    }
    res.json({ message: 'Post Deleted Successfully' });
  } catch (err) {
    res.json({ err: 'Failed to Delete Post' });
  }
};

module.exports ={
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost}