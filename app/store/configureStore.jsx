var redux = require('redux');
import * as reducers from 'reducers';

export var configure = (initialState) => {
	var reducer = redux.combineReducers({
		test: reducers.testReducer,
	});
	var store = redux.createStore(reducer, initialState);

	return store;
}