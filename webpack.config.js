module.exports = {
  context: __dirname + '/app',
  entry: {
    javascript: './app.js',
    html: './index.html'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        // Transpile javascript
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets:[
            {
              plugins: ['transform-object-rest-spread']
            },
            'react',
            'es2015'
          ]
        }
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        // Preprocess SCSS
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
};
