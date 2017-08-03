var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


const PORT = process.env.PORT || 3001;

app.use(function(req, res, next) {
	if(req.headers['x-forwared-proto'] == 'https') {
		res.redirect('http://' + req.hostname + req.url);
	} else {
		next();
	}
})

app.use(express.static('public'));

server.listen(PORT, function() {
	console.log('Express server running on PORT' + PORT)
})