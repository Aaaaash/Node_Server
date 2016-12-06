var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var jsonParser = bodyParser.json()

router.get('/', function(req, res, next) {
  res.send(req.flash());
});

router.post('/', jsonParser, function(req, res, next) {
  if(req.body.email === 'binshao54@gmail.com') {
    res.send({
      code: 0,
      message: 'ok',
    });
  }else {
    res.send({
      code: -1,
      message: 'error',
    });
  }
});

module.exports = router;
