const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://exirvbackend.herokuapp.com",
      changeOrigin: true,
    })
  );
};
