var express = require('express');
var router = express.Router();
var CommentsModel = require('../lib/mongo').CommentsModel;

// 获取单篇文章下评论
router.get('/:articleID', function(req, res, next) {
  var articleID = req.params.articleID;
  CommentsModel.find({ articleID }, { __v: 0 }, function(err, data) {
    if(err) throw err;
    return res.status(200).json({ code: 0, data: data, message: 'ok', total: data.length });
  });
});

// 提交评论
router.post('/', function(req, res, next) {
  var comment = {
    nickname: req.body.nickname,
    personalWebsite: req.body.personalWebsite,
    commentContent: req.body.commentContent,
    articleID: req.body.articleID,
    createAt: parseInt(new Date().getTime()/1000),
  };
  CommentsModel.create(comment, function(err, info) {
    if(err) throw err;
    return res.status(200).json({ code: 0, message: 'ok' });
  });
});

module.exports = router;
