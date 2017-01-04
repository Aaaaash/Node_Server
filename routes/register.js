var path = require('path');
var sha1 = require('sha1');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

var UserModel = require('../lib/mongo').UserModel;
var jsonParser = bodyParser.json()

router.put('/', function(req, res, next) {
  var email = req.body.email;
  var name = req.body.name;
  var gender = req.body.gender;
  var bio = req.body.bio;
  var avatar = req.body.avatar;
  var password = req.body.password;
  var user = {
    email: email,
    name: name,
    password: password,
    gender: gender,
    bio: bio,
    avatar: avatar
  };
  UserModel.create(user, function(err, user) {
    if (err) throw err;
    if(user) {
      setTimeout(() => {
        return res.status(200).json({ code: 0, message: 'ok' });
      }, 500);
    }
  });
});

module.exports = router;
