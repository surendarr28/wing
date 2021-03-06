module.exports = require('./config/webpack.prod.js');
// var webpack = require('webpack');
// var path = require('path');


// // Webpack Config
// var webpackConfig = {
//   entry: {
//     'polyfills': './src/polyfills.browser.ts',
//     'vendor': ['./src/vendor.browser.ts', "./node_modules/socket.io-client"],
//     'main': './src/main.browser.ts',
//   },

//   output: {
//     path: './src',
//   },
//   devtool: '#source-map',
//   resolve: {
//     extensions: ['', '.ts', '.js'],
//   },

//   plugins: [
//     new webpack.optimize.OccurenceOrderPlugin(true),
//     new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
//   ],

//   module: {
//     loaders: [
//       // .ts files for TypeScript
//       { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] },
//       { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },
//       { test: /\.html$/, loader: 'raw-loader' },
//       {
//         test: /\.(jpe?g|png|gif|svg)$/i,
//         loaders: [
//             'file?hash=sha512&digest=hex&name=[hash].[ext]',
//             'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
//         ]
//     }
//     ]
//   }

// };


// // Our Webpack Defaults
// var defaultConfig = {
//   devtool: 'cheap-module-source-map',
//   cache: true,
//   debug: true,
//   output: {
//     filename: '[name].bundle.js',
//     sourceMapFilename: '[name].map',
//     chunkFilename: '[id].chunk.js'
//   },

//   resolve: {
//     root: [path.join(__dirname, 'src')],
//     extensions: ['', '.ts', '.js']
//   },

//   devServer: {
//     historyApiFallback: true,
//     watchOptions: { aggregateTimeout: 300, poll: 1000 }
//   },

//   node: {
//     global: 1,
//     crypto: 'empty',
//     module: 0,
//     Buffer: 0,
//     clearImmediate: 0,
//     setImmediate: 0
//   }
// };

// var webpackMerge = require('webpack-merge');
// module.exports = webpackMerge(defaultConfig, webpackConfig);
