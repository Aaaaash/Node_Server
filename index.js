var app = require('express')();
var config = require('config-lite');
var routes = require('./routes');
var pkg = require('./package')
var server = require('http').Server(app);
// var io = require('socket.io')(server);

// io.on('connection', function (socket) {
//   console.log('keke');
//   socket.on('message', function (msg) {
//     console.log(msg);
//     io.emit('3q', '收到了');
//   });
//   console.log(socket.id);
//   socket.on('disconnect', function () {

//   });
// });
// 路由
routes(app);
// app.use(express.static(__dirname + '/build'));
// 监听端口，启动程序
server.listen(config.port, function () {
  console.log(`${pkg.name} listening on port ${config.port}`);
});
