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
	// {name:'My game', creator:'Toxcik'},
	// {name:'My game2', creator:'Fynjy'},
	// {name:'My game3', creator:'FarmerSenpai'},
];
var justRooms = [];

io.on('connection', function (socket) {
	console.log('user connected');
	// socket.emit('news', { hello: 'world' });

	socket.on('getRooms', function () {
		console.log('GET: ROOMS', justRooms);
		socket.emit('rooms', { rooms:justRooms });
	});

	socket.on('createRoom', function(data) {
		console.log('createRoom data', data);
		if((rooms.filter((room) => {return room.name === data.room.name})).length === 0) {
			socket.emit('createRoom', { result:true, room:data.room, });
			rooms.push({
				name:data.room.name,
				creator:data.room.creator,
				creatorSocket:socket,
				playerSocket:undefined,
			});
			justRooms.push({
				name:data.room.name,
				creator:data.room.creator,
			});
		} else {
			socket.emit('createRoom', { result:false, });
		}
	});

	socket.on('joinRoom', function(data) {
		console.log('joinRoom data', data);
		var room = {
			playerSocket:undefined,
		};
		var index = 0;
		var finded = false;
		for (var i = 0; i < justRooms.length; i++) {
			if (justRooms[i].name === data.room.name) {
				room = rooms[i];
				finded = true;
				index = i;
			}
		}
		if(finded) {
			if(room.playerSocket === undefined) {
				socket.emit('joinRoom', { result:true, room: {
						name:data.room.name,
						creator:data.room.creator,
					},
				});
				room.creatorSocket.emit('joinRoom', { playerName:data.playerName});
				rooms[index].playerSocket = socket;
			} else {
				socket.emit('joinRoom', { result:false, });
			}
		}
	});

	socket.on('closeRoom', function(data) {
		console.log('closeRoom data', data);
		var room = {
			playerSocket:undefined,
		};
		var index = 0;
		var finded = false;
		for (var i = 0; i < rooms.length; i++) {
			if (rooms[i].name === data.room.name) {
				room = rooms[i];
				finded = true;
				index = i;
			}
		}
		if(finded) {
			if(room.playerSocket !== undefined) {
				room.playerSocket.emit('closeRoom');
				rooms.splice(index, 1);
			}
		}
	});

	socket.on('leaveRoom', function(data) {
		console.log('leaveRoom data', data);
		var room = {
			playerSocket:undefined,
		};
		var index = 0;
		var finded = false;
		for (var i = 0; i < rooms.length; i++) {
			if (rooms[i].name === data.room.name) {
				room = rooms[i];
				finded = true;
				index = i;
			}
		}
		if(finded) {
			if(room.playerSocket !== undefined) {
				room.creatorSocket.emit('leaveRoom', false);
				room.playerSocket.emit('leaveRoom', true);
				rooms[index].playerSocket = undefined;
			}
		}
	});


});