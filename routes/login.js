var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var sha1 = require('sha1');

var UserModel = require('../models/users');

var jsonParser = bodyParser.json()

router.get('/', function(req, res, next) {
  res.send(req.flash());
});

router.post('/', jsonParser, function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  UserModel.getUserName(email)
   .then(function (user) {
     if (user === null) {
       req.flash('error', '用户不存在');
     }
     // 检查密码是否匹配
     if (sha1(password) !== user.password) {
       req.flash('error', '用户名或密码错误');
     }
     req.flash('success', '登录成功');
     // 用户信息写入 session
     delete user.password;
     req.session.user = user;
     // 跳转到主页
    //  res.redirect('/posts');
   })
   .catch(next);
});

module.exports = router;
