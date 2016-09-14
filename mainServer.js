var appServer = require("./webpackServer");
var apiServer = require("./apiserver");
var PORT = process.env.PORT || 3000;
var PROD = process.env.NODE_ENV === "prod";

if (PROD) {
  apiServer(PORT);
} else {
  apiServer(PORT - 1);
  appServer(PORT);
}
