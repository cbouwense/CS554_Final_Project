const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { target: 'http://localhost:4000/' }));
  app.use(proxy('/socket.io', { target: 'ws://localhost:4000/', ws: true }));
};
