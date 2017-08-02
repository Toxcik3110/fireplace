import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Menu from 'Menu';
import Battle from 'Battle';
import Decks from 'Decks';
import DeckBuilder from 'DeckBuilder';

class MainApp extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Router>
				<div>
					<Route exact path='/' component={Menu} />
					<Route path='/battle' component={Battle} />
					<Route path='/decks' component={Decks} />
					<Route path='/deckBuilder' component={DeckBuilder} />
				</div>
			</Router>
		);
	}
}

export default MainApp;