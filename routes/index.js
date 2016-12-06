module.exports = function (app) {
  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", 'application/json');
    next();
  });
  app.get('/', function(req, res) {
    res.redirect('/posts');
  });
  app.use('/login', require('./login'));
  app.use('/logout', require('./logout'));
  app.use('/posts', require('./posts'));
  app.use('/register', require('./register'));
};
