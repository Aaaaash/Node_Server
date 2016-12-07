var UserModel = require('../lib/mongo');
module.exports = {
  // 注册一个用户
  create: function create(user, callback) {
    return UserModel.create(user, callback);
  },
  getUserName: function getUserName(email, callback) {
    UserModel.findOne({ email: email }, function(err, user) {
      if(!user) {
        return res.status(404).json({code: -1, message: '没有这个用户'});
      }else if(password !== sha1(user.password)) {
        return res.status(401).json({code: -1, message: '密码错误'});
      } else {
        return res.status(200).json({code: 0, message: 'ok'});
      }
    });
  }
};
