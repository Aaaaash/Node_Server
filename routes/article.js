var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var ArticleModel = require('../lib/mongo').ArticleModel;

// 获取所有文章
router.get('/', function (req, res, next) {
  var query = {};
  if (req.query.title) {
    query['title'] = new RegExp(req.query.title);//模糊查询参数
  }
  ArticleModel.find(query, { __v: 0 }, function (err, article) {
    setTimeout(function () {
      return res.status(200).json({ code: 0, message: 'ok', data: article });
    }, 1500);
  });
});

// 创建文章
router.post('/', function (req, res, next) {
  var title = req.body.title;
  var tags = req.body.tags;
  var content = req.body.content;
  var author = req.body.author;
  var published = req.body.published;
  var token = req.headers.authorization;
  var createAt = parseInt(new Date().getTime() / 1000);
  var article = {
    title: title,
    tags: tags,
    content: content,
    author: author,
    createAt: createAt,
    published: published,
  };
  jwt.verify(token, 'blog', function (err, info) {
    if (err) throw err;
    if (info) {
      ArticleModel.create(article, function (err, info) {
        if (err) throw err;
        return res.status(200).json({ code: 0, message: 'ok' });
      });
    }
  });
});

// 获取一篇文章
router.get('/:articleID', function (req, res, next) {
  var id = req.params.articleID;
  ArticleModel.findOne({ _id: id }, { __v: 0, _id: 0 }, function (err, article) {
    var meta = {
      next: {
        id: '',
        title: '',
      },
      prev: {
        id: '',
        title: '',
      }
    };
  
    ArticleModel.find(
      {createAt: {"$gt": article.createAt}},
      { __v: 0, tags: 0 , content: 0},
      function (err, next) {
        var length = next.length;
        if (length === 0) meta.next = null;
        else {
          meta.next.id = next[0]._id;
          meta.next.title = next[0].title;
        }
      });
    ArticleModel.find(
      {createAt: {"$lt": article.createAt}},
      { __v: 0, tags: 0 , content: 0},
      function (err, prev) {
        var length = prev.length;
        if (length === 0) meta.prev = null;
        else {
          meta.prev.id = prev[length-1]._id;
          meta.prev.title = prev[length-1].title;
        }
      });
    setTimeout(function () {
      return res.status(200).json({
        code: 0,
        message: 'ok',
        data: article,
        meta: meta,
      });
    }, 500);
  });
});

// 删除一篇文章
router.delete('/:articleID', function (req, res, next) {
  res.send(req.flash());
});

module.exports = router;
