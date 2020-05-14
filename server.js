const express = require('express');
const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');
const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
server.use(express.json());
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

//custom middleware
server.use(logger);
function logger(req, res, next) {
  console.log(`method: ${req.method}, url: ${req.url}, timestamp:${Date.now()}`);
  next();
}

module.exports = server;
