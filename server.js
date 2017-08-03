var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

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
});


var rooms = [
				{name:'My game', creator:'Toxcik'},
				{name:'My game2', creator:'Fynjy'},
				{name:'My game3', creator:'FarmerSenpai'},
			];

io.on('connection', function (socket) {
	console.log('user connected');
	socket.emit('news', { hello: 'world' });

	socket.on('getRooms', function () {
		console.log('GET: ROOMS');
		socket.emit('rooms', { rooms:rooms });
	});

	socket.on('createRoom', function(data) {
		if(data) {
			socket.emit('createRoom', { result:true, });
		} else {
			socket.emit('createRoom', { result:false, });
		}
	});

});