import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import MainApp from 'MainApp';
import * as actions from 'actions';

var store = require('configureStore').configure();
store.subscribe(() => {
	var state = store.getState();
	console.log('New state', state);
});

store.dispatch(actions.generateDeck('player'));
store.dispatch(actions.generateDeck('enemy'));

//Load foundation
$(document).foundation();

//APP CSS
import 'style-loader!css-loader!sass-loader!applicationStyles';

//Elemental UI kit
// import 'style-loader!css-loader!less-loader!../node_modules/elemental/less/elemental.less'


ReactDOM.render(
	<Provider store={store}>
		<MainApp />
	</Provider>,
	document.getElementById("app")
);