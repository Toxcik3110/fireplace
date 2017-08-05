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
var activeGames = [];

io.on('connection', function (socket) {
	console.log('user connected');
	var activeGame;
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
			if (rooms[i].name === data.roomName) {
				room = rooms[i];
				finded = true;
				index = i;
			}
		}
		if(finded) {
			if(room.playerSocket !== undefined) {
				room.playerSocket.emit('closeRoom');
			}
			rooms.splice(index, 1);
			justRooms.splice(index, 1);
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

	socket.on('selectDeck', function(data) {
		console.log('selectDeck data', data); //{roomName, who:'player'/'creator',deck}
		var room = {
			playerSocket:undefined,
		};
		var index = 0;
		var finded = false;
		for (var i = 0; i < rooms.length; i++) {
			if (rooms[i].name === data.roomName) {
				room = rooms[i];
				finded = true;
				index = i;
			}
		}
		if(finded) {
			if(room.playerSocket !== undefined) {
				if(data.who === 'player') {
					room.creatorSocket.emit('selectDeck');
					room.playerDeck = data.deck;
					activeGame = room.creatorSocket;
				} else if (data.who === 'creator') {
					room.playerSocket.emit('selectDeck');
					room.creatorDeck = data.deck;
					activeGame = room.playerSocket;
				}
			}
		}
	});

	socket.on('deselectDeck', function(data) {
		console.log('deselectDeck data', data); //{roomName, who:'player'/'creator',deck}
		var room = {
			playerSocket:undefined,
		};
		var index = 0;
		var finded = false;
		for (var i = 0; i < rooms.length; i++) {
			if (rooms[i].name === data.roomName) {
				room = rooms[i];
				finded = true;
				index = i;
			}
		}
		if(finded) {
			if(room.playerSocket !== undefined) {
				if(data.who === 'player') {
					room.creatorSocket.emit('deselectDeck');
					room.playerDeck = undefined;
					activeGame = undefined;
				} else if (data.who === 'creator') {
					room.playerSocket.emit('deselectDeck');
					room.creatorDeck = undefined;
					activeGame = undefined;
				}
			}
		}
	});

	socket.on('startGame', function(data) {
		console.log('startGame data', data); //{roomName}
		var room = {
			playerSocket:undefined,
		};
		var index = 0;
		var finded = false;
		for (var i = 0; i < rooms.length; i++) {
			if (rooms[i].name === data.roomName) {
				room = rooms[i];
				finded = true;
				index = i;
			}
		}
		if(finded) {
			if(room.playerSocket !== undefined) {
				room.playerSocket.emit('startGame');
				room.creatorSocket.emit('startGame');
				rooms.splice(index,1);
				justRooms.splice(index,1);
			}
		}
	});


});