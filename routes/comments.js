var express = require('express');
var router = express.Router();
var CommentsModel = require('../lib/mongo').CommentsModel;

// 获取单篇文章下评论

// 提交评论
router.post('/', function(req, res, next) {
  var comment = {
    nickname: req.body.nickname,
    personalWebsite: req.body.personalWebsite,
    commentContent: req.body.commentContent,
    articleID: req.body.articleID,
  };
  CommentsModel.create(comment, function(err, info) {
    if(err) throw err;
    return res.status(200).json({ code: 0, message: 'ok' });
  })
});

module.exports = router;
