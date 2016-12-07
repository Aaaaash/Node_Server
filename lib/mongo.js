var config = require('config-lite');
var mongoose = require('mongoose');
var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');

// mongoose.connect(config.mongodb);

var db = mongoose.createConnection(config.mongodb);
db.on('open', function callback(e) {
  console.log('ok');
});

db.on('error',function callback(err) {
  console.log('err');
})

var UserSchema = new mongoose.Schema({
  name: { type: 'string' },
  password: { type: 'string' },
  email: { type: 'string' },
  avatar: { type: 'string' },
  gender: { type: 'string', enum: ['m','f','x'] },
  bio: { type: 'string' }
});
var UserModel = db.model('UserModel', UserSchema);

module.exports = UserModel;
