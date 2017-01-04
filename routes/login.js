var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var sha1 = require('sha1');
var UserModel = require('../lib/mongo').UserModel;

router.post('/', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  console.log(req.body);
  UserModel.findOne({ email: email }, function(err, user) {
    if (err) throw err;
    if(!user) {
      return res.status(404).json({ code: -1, message: '没有这个用户' });
    }
    if(password !== user.password) {
      return res.status(401).json({ code: -1, message: '密码错误' });
    }
    var token = jwt.sign({id: user._id, author: user.name}, 'blog');
    var expiresIn = new Date();
  	expiresIn = expiresIn.setDate(expiresIn.getDate() + 15);
    setTimeout(function() {
      return res.status(200).json({ code: 0, message: 'ok', token: token, expiresIn: parseInt(expiresIn/1000) });
    }, 1500);
  });
});

module.exports = router;
