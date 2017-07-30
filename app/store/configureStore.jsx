var redux = require('redux');
import * as reducers from 'reducers';

export var configure = (initialState) => {
	var reducer = redux.combineReducers({
		player: reducers.playerReducer,
		playerDeck: reducers.playerDeckReducer,
		playerHand: reducers.playerHandReducer,
		playerForces: reducers.playerForcesReducer,
		enemy: reducers.enemyReducer,
		enemyDeck: reducers.enemyDeckReducer,
		enemyHand: reducers.enemyHandReducer,
		enemyForces: reducers.enemyForcesReducer,
		turn: reducers.turnReducer,
		user: reducers.userReducer,
	});
	var store = redux.createStore(reducer, initialState);

	return store;
}