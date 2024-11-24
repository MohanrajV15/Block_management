const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');
const { log } = require('console');

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await userModel.createUser({ name, email, password: hashedPassword });
    res.json({ message: 'User created successfully' });
  } catch (err) {
    res.json({ err: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findUser(email);
    if (!user) {
       res.json({ error: 'Invalid credentials' });
    }else if(!(await bcrypt.compare(password, user.password))){
      res.json({ error: 'Invalid credentials' });
    }else{
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log(token);
      
      res.json({ token });
    }
  } catch (err) {
    res.json({ err: 'Server error' });
  }
};


module.exports = {signUp, login};