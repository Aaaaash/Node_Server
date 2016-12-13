var config = require('config-lite');
var mongoose = require('mongoose');
var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');

var db = mongoose.createConnection(config.mongodb);
db.on('open', function callback(e) {
  console.log('ok');
});

db.on('error',function callback(err) {
  console.log(err);
})

// 用户模型
var UserSchema = new mongoose.Schema({
  name: { type: 'string' },
  password: { type: 'string' },
  email: { type: 'string' },
  avatar: { type: 'string' },
  gender: { type: 'string', enum: ['m','f','x'] },
  bio: { type: 'string' }
});
var UserModel = db.model('UserModel', UserSchema);

// blog模型
var ArticleSchema = new mongoose.Schema({
  title: { type: 'string' },
  author: { type: 'string' },
  tags: { type: 'string' },
  createAt: { type: 'string' },
  content: { type: 'string' },
});

var ArticleModel = db.model('ArticleModel', ArticleSchema);

// 评论模型
var CommentsSchema = new mongoose.Schema({
  nickname: { type: "string" } ,
  personalWebsite: { type: "string" },
  commentContent: { type: "string" },
  articleID: { type: "string" },
  createAt: { type: "string" },
});

var CommentsModel = db.model('CommentsModel', CommentsSchema);

module.exports = {
  UserModel: UserModel,
  ArticleModel: ArticleModel,
  CommentsModel: CommentsModel,
};
