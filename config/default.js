module.exports = {
  port: 8000,
  session: {
    secret: 'blog',
    key: 'blog',
    masAge: 2592000000,
  },
  mongodb: 'mongodb://localhost:27017/blog'
};
