var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

module.exports = function (app) {
  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
  });
  // app.use(express.static(path.join(__dirname,'../build')));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(function(err, req, res, next) {
    return res.json({'status':-1, 'result':err.stack})
  });
  // app.use('/', function(req, res) {
  //   res.sendFile(path.join(__dirname,'../build/index.html'))
  // });
  app.use('/login', require('./login'));
  app.use('/logout', require('./logout'));
  app.use('/userInfo', require('./user'));
  app.use('/article', require('./article'));
  app.use('/register', require('./register'));
  app.use('/comments', require('./comments'));
  app.use('*', function(req, res) {
    res.sendFile(path.join(__dirname,'../build/index.html'))
  });
};
