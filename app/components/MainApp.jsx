import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Menu from 'Menu';
import Battle from 'Battle';
import Decks from 'Decks';
import DeckBuilder from 'DeckBuilder';
import io from 'socket.io-client';
const socket = io(); 

socket.on('news', function (data) {
	console.log(data);
	socket.emit('my other event', { my: 'data' });
});

class MainApp extends React.Component {

	constructor(props) {
		super(props);
		socket.on('connect', function(){});
		socket.on('event', function(data){});
		socket.on('disconnect', function(){});
	}
	render() {
		//enable socket

		return (
			<Router>
				<div>
					<Route exact path='/' component={Menu} />
					<Route path='/battle' component={Battle} />
					<Route path='/decks' component={Decks} />
				</div>
			</Router>
		);
	}
}

export default MainApp;