var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var UserModel = require('../lib/mongo');

router.get('/', function(req, res, next) {
  const token = req.headers.authorization;
  jwt.verify(token, 'blog', function(err, info) {
    UserModel.findOne({ _id: info.id },{ password: 0, __v: 0 }, function(err, user) {
      if (err) throw err;
      if(!user) {
        return res.status(404).json({ code: -1, message: 'error' });
      }
      var authInfo = user;
      delete authInfo.password;
      delete authInfo._v;
      return res.status(200).json({ code: 0, message: 'ok', data: authInfo });
    });
  })

});

module.exports = router;
