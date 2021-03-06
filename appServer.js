var webpack = require('webpack');
var config = require('./webpack.config');
var WebpackDevServer = require('webpack-dev-server');

module.exports = function(PORT) {
  var server = new WebpackDevServer(webpack(config), {
    // TODO: Getting errors when trying to use string interpolation
    proxy: {
      '*': 'http://localhost:' + (PORT - 1)
    }
  });

  server.listen(PORT, 'localhost');
}
