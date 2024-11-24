const db = require('../config/db');

createUser = async (userData) => {
  const { name, email, password } = userData;
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  await db.execute(query, [name, email, password]);
};

findUser = async (email) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

module.exports = {createUser,findUser}