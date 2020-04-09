const express = require('express');
const ActionRouter = require('./routers/ActionRouter');
const ProjectRouter = require('./routers/ProjectRouter');
const server = express();

server.use(logger);
server.use(express.json());
server.use('/api/actions', ActionRouter);
server.use('/api/projects', ProjectRouter);

server.get('/', (req, res) => {
  res.send('<h2>Yes! Server is running </h2>')
});

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );
  next();
}

module.exports = server;