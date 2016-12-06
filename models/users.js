var User = require('../lib/mongo').User;

module.exports = {
  // 注册一个用户
  create: function create(user) {
    return User.create(user).exec();
  },
  getUserName: function getUserName(email) {
    console.log(email);
    return User
      .find()
      .select({ email: email })
      // .findOne({ email: email })
      .addCreatedAt()
      .exec();
  }
};
