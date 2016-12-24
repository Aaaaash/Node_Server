var bodyParser = require('body-parser');
module.exports = function (app) {
  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
  });
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(function(err, req, res, next) {
    return res.json({'status':-1, 'result':err.stack})
  });
  app.get('/', function(req, res) {
    res.redirect('/build');
  });
  app.use('/login', require('./login'));
  app.use('/logout', require('./logout'));
  app.use('/userInfo', require('./user'));
  app.use('/article', require('./article'));
  app.use('/register', require('./register'));
  app.use('/comments', require('./comments'));
};
