var express = require('express');
var router = express.Router();

// 获取所有文章
router.get('/', function(req, res, next) {
  res.send(req.flash());
});

router.post('/create', function(req, res, next) {
  res.send(req.flash());
});

router.get('/:articleID', function(req, res, next) {
  res.send(req.flash());
});

router.get('/:articleID/remove', function(req, res, next) {
  res.send(req.flash());
});

module.exports = router;
