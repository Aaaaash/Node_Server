var path = require('path');
var sha1 = require('sha1');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

var UserModel = require('../lib/mongo').UserModel;
var jsonParser = bodyParser.json()

router.post('/', function(req, res, next) {
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
  UserModel.create(user, function(err, user) {
    // if(!user) {
    //   return res.status(404).json({ code: -1, message: '没有这个用户' });
    // }
    // if(password !== sha1(user.password)) {
    //   return res.status(401).json({ code: -1, message: '密码错误' });
    // }
    return res.status(200).json({ code: 0, message: 'ok' });
  });
});

module.exports = router;
