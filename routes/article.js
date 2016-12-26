var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var ArticleModel = require('../lib/mongo').ArticleModel;
var CommentsModel = require('../lib/mongo').CommentsModel;

// 获取所有文章
router.get('/', function (req, res, next) {
  var query = {
    published: true,
  };
  if (req.query.title) {
    query['title'] = new RegExp(req.query.title);//模糊查询参数
  }
  ArticleModel.find(query, { __v: 0 }, function (err, article) {
    setTimeout(function () {
      return res.status(200).json({ code: 0, message: 'ok', data: article });
    }, 500);
  });
});

// 获取作者私有文章
router.get('/private', function(req, res, next) {
  var token = req.headers.authorization;
  jwt.verify(token, 'blog', function(err, info) {
    if (err) throw err;
    if (info) {
      var author = info.author;
      ArticleModel.find({ author: author }, { __v: 0 }, function(err, article) {
        setTimeout(function() {
          return res.status(200).json({ code: 0, data: article, message: 'ok' });
        }, 500);
      })
    }
  });
});

// 文章归档
router.get('/archives', (req, res, next) => {
  const filter = {
    __v: 0,
    content: 0,
    published: 0,
    tags: 0,
  };
  ArticleModel.find(
    { published: true },
    filter,
    { sort:{createAt:-1} },
    function (err, article) {
      if (err) throw err;
      return res.status(200).json({ code: 0, data: article, message: 'ok' });
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
        setTimeout(() => {
          return res.status(200).json({ code: 0, message: 'ok' });
        }, 500);
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

// 修改一篇文章
router.put('/:articleID', function(req, res, next) {
  var id = req.params.articleID;
  const body = {
    title: req.body.title,
    tags: req.body.tags,
    content: req.body.content,
    published: req.body.published,
  }
  ArticleModel.update({ _id: id }, { $set: body }, function(err, response) {
    if (err) throw err;
    setTimeout(() => {
      return res.status(200).json({ code: 0, message: 'ok' });
    }, 500);
  });
});

// 删除一篇文章
router.delete('/:articleID', function (req, res, next) {
  var id = req.params.articleID;
  ArticleModel.remove({ _id: id }, function(err, response) {
    if(err) throw err;
    CommentsModel.remove({ articleID: id }, function(err, response) {
      if(err) throw err;
      setTimeout(() => {
        res.status(200).json({ code: 0, message: 'ok' });
      }, 1000);
    })
  });
});

module.exports = router;
