var express = require('express');
var router = express.Router();

// 获取所有文章
router.get('/', function(req, res, next) {
  res.send(req.flash());
});

router.post('/', function(req, res, next) {
  res.send(req.flash());
});

router.get('/:postId', function(req, res, next) {
  res.send(req.flash());
});

router.get('/:postId/remove', function(req, res, next) {
  res.send(req.flash());
});

module.exports = router;
