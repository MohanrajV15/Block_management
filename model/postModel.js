const db = require('../config/db');

createPost = async (post) => {
  const { title, content, userId } = post;
  const query = 'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)';
  await db.execute(query, [title, content, userId]);
};

 getAllPosts = async ( limit, offset, search ) => {
  
  const query = `
    SELECT posts.id, posts.title, posts.content, users.name AS author, posts.created_at, posts.updated_at
    FROM posts
    INNER JOIN users ON posts.user_id = users.id`;  
  const searchPattern = `%${search}%`;
  const [rows] = await db.execute(query, [searchPattern, searchPattern, parseInt(limit), parseInt(offset)]);  
  return rows;
};


 getTotalPosts = async (search) => {
  const query = `
    SELECT COUNT(*) AS total
    FROM posts
    WHERE title LIKE ? OR content LIKE ?
  `;
  const searchPattern = `%${search}%`;  
  const [rows] = await db.execute(query, [searchPattern, searchPattern]);
  return rows[0].total;
};




getPostById = async (id) => {
  const query = `
    SELECT posts.id, posts.title, posts.content, users.name AS author, posts.created_at, posts.updated_at
    FROM posts
    INNER JOIN users ON posts.user_id = users.id
    WHERE posts.id = ?
  `;
  const [rows] = await db.execute(query, [id]);
  return rows[0]; 
};


updatePost = async (id, title, content, userId) => {
  const query = `
    UPDATE posts
    SET title = ?, content = ?, updated_at = NOW()
    WHERE id = ? AND user_id = ?
  `;
  const [data] = await db.execute(query, [title, content, id, userId]);
  return data;
};



deletePost = async (id, userId) => {
  const query = `
    DELETE FROM posts
    WHERE id = ? AND user_id = ?
  `;
  const [data] = await db.execute(query, [id, userId]);
  return data;
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost, getTotalPosts };