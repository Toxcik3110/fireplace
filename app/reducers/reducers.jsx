import uuid from 'node-uuid';

function generateCard() {
	var collection = [
		{
			classes:'card1',
			mana: 3,
			hp: 4,
			atk: 6,
		},
		{
			classes:'card2',
			mana: 1,
			hp: 1,
			atk: 1,
		},
		{
			classes:'card3',
			mana: 2,
			hp: 3,
			atk: 2,
		}
	];
	var r = Math.floor(Math.random()*collection.length);
	return {
		id: uuid(),
		...collection[r]
	}
}

export var playerReducer = (state = {hp:30, maxHp:30, mana:0, maxMana:0}, action) => {
	switch(action.type) {
		case 'PLACE_CARD':
			return {
				...state,
				mana: state.mana - action.card.mana,
			};
		default:
			return state;
	}
}

export var playerDeckReducer = (state = [], action) => {
	switch(action.type) {
		case 'GENERATE_DECK':
			var deck = [];
			for (var i = 0; i < action.size; i++) {
				deck.push(generateCard());
			}
			return deck;
		case 'GET_CARD': 
			return state.filter((card) => {return card.id !== action.card.id;});
		default:
			return state;
	}
}

export var playerHandReducer = (state = {}, action) => {
	switch(action.type) {
		case 'GET_CARD': 
			return [
				...state,
				action.card
			];
		case 'PLACE_CARD':
			return state.filter((card) => {return card.id !== action.card.id;});
		default:
			return state;
	}
}

export var playerForcesReducer = (state = {}, action) => {
	switch(action.type) {
		case 'PLACE_CARD':
			return [
				...state,
				action.card
			];
		default:
			return state;
	}
}

export var enemyReducer = (state = {hp:30,maxHp:30, mana:0, maxMana:0}, action) => {
	switch(action.type) {
		default:
			return state;
	}
}

export var enemyDeckReducer = (state = {}, action) => {
	switch(action.type) {
		default:
			return state;
	}
}

export var enemyHandReducer = (state = {}, action) => {
	switch(action.type) {
		default:
			return state;
	}
}

export var enemyForcesReducer = (state = {}, action) => {
	switch(action.type) {
		default:
			return state;
	}
}

export var turnReducer = (state = 'player', action) => {
	switch(action.type) {
		case 'END_TURN':
			return state === 'player' ? 'enemy' : 'player';
		default:
			return state;
	}
}