import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Menu from 'Menu';
import Battle from 'Battle';

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
				</div>
			</Router>
		);
	}
}

export default MainApp;