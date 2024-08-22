const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  
  app.use(
    '/spring',
    createProxyMiddleware({
      target: 'http://localhost:9099',
      changeOrigin: true,
    })
  );
  

  app.use(
    '/python',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
    })
  );
};
