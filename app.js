require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const {DatabaseAndTables} = require('./config/tables');

const user = require('./router/userRouter');
const post = require('./router/postRouter');
const comment = require('./router/commentRouter');



const app = express();
DatabaseAndTables();

app.use(bodyParser.json());

app.use('/api/health',(req,res) => {
  res.send('health check ok....');
})
app.use('/api/user', user);
app.use('/api/post', post);
app.use('/api/comment', comment);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
