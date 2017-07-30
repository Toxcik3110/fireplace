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

//Load foundation
$(document).foundation();


//APP CSS
import 'style-loader!css-loader!sass-loader!applicationStyles';

ReactDOM.render(
	<Provider store={store}>
		<MainApp />
	</Provider>,
	document.getElementById("app")
);