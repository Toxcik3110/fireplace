import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Menu from 'Menu';
import Battle from 'Battle';
import Decks from 'Decks';

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
				</div>
			</Router>
		);
	}
}

export default MainApp;