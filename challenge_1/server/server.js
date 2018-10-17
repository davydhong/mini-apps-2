const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(__dirname + '/../data/db.json');
const middlewares = jsonServer.defaults({
  static: __dirname + '/../public'
});

server.use(middlewares);

// ----------------------------------------
// * webpack hot re-load setup
// ----------------------------------------
(function() {
  // Step 1: Create & configure a webpack compiler
  var webpack = require('webpack');
  var webpackConfig = require('../webpack.dev');
  var compiler = webpack(webpackConfig);

  // Step 2: Attach the dev middleware to the compiler & the server
  server.use(
    require('webpack-dev-middleware')(compiler, {
      logLevel: 'warn',
      publicPath: webpackConfig.output.publicPath
    })
  );

  // Step 3: Attach the hot middleware to the compiler & the server
  server.use(
    require('webpack-hot-middleware')(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000
    })
  );
})();

server.use('/api', router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
