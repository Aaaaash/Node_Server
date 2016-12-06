var path = require('path');
var sha1 = require('sha1');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');
var jsonParser = bodyParser.json()

router.post('/', jsonParser, function(req, res, next) {
  var email = req.body.email;
  var name = req.body.name;
  var gender = req.body.gender;
  var bio = req.body.bio;
  var avatar = req.body.avatar;
  var password = req.body.password;
  password = password;
  var user = {
    email: email,
    name: name,
    password: password,
    gender: gender,
    bio: bio,
    avatar: avatar
  };
  UserModel.create(user)
    .then(function (result) {
      console.log(result);
      // 此 user 是插入 mongodb 后的值，包含 _id
      user = result.ops[0];
      // 将用户信息存入 session
      delete user.password;
      req.session.user = user;
      // 写入 flash
      req.flash('success', '注册成功');
      // 跳转到首页
    })
    .catch(function (e) {
      // 用户名被占用则跳回注册页，而不是错误页
      if (e.message.match('E11000 duplicate key')) {
        req.flash('error', '用户名已被占用');
      }
      next(e);
    });
});

module.exports = router;
