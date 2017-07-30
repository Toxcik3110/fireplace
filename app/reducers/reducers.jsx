import uuid from 'node-uuid';

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

function generateCard() {
	var r = Math.floor(Math.random()*collection.length);
	return {
		id: uuid(),
		...collection[r]
	}
}


var initialPlayer = {hp:30, maxHp:30, mana:0, maxMana:0,draw:0}

export var playerReducer = (state = initialPlayer, action) => {
	switch(action.type) {
		case 'PLACE_CARD':
			if(action.player == 'player') {
				return {
					...state,
					mana: state.mana - action.card.mana,
				};
			} else {
				return state;
			}
		case 'GET_CARD':
			if(action.player == 'player') {
				return {
					...state,
					draw: state.draw - 1,
				};
			} else {
				return state;
			}
		case 'END_TURN':
			if(action.player == 'enemy') {
				return {
					...state,
					maxMana: state.maxMana + 1,
					mana: state.maxMana + 1,
					draw: state.draw + 1,
				}
			} else {
				return state;
			}
		default:
			return state;
	}
}

export var playerDeckReducer = (state = [], action) => {
	switch(action.type) {
		case 'GENERATE_DECK':
			var deck = [];
			if(action.player == 'player') {
				for (var i = 0; i < action.size; i++) {
					deck.push(generateCard());
				}
				return deck;
			} else {
				return state;
			}
		case 'GET_CARD': 
			if(action.player == 'player') {	
				return state.filter((card) => {return card.id !== action.card.id;});
			} else {
				return state;
			}
		default:
			return state;
	}
}

export var playerHandReducer = (state = [], action) => {
	switch(action.type) {
		case 'GET_CARD': 
			if(action.player == 'player') {
				return [
					...state,
					action.card
				];
			} else {
				return state;
			}
		case 'PLACE_CARD':
			if(action.player == 'player') {
				return state.filter((card) => {return card.id !== action.card.id;});
			} else {
				return state;
			}
		default:
			return state;
	}
}

export var playerForcesReducer = (state = {}, action) => {
	switch(action.type) {
		case 'PLACE_CARD':
			if(action.player == 'player') {
				return [
					...state,
					action.card
				];
			} else {
				return state;
			}
		default:
			return state;
	}
}

export var enemyReducer = (state = initialPlayer, action) => {
	switch(action.type) {
		case 'PLACE_CARD':
			if(action.player == 'enemy') {
				return {
					...state,
					mana: state.mana - action.card.mana,
				};
			} else {
				return state;
			}
		case 'GET_CARD':
			if(action.player == 'enemy') {
				return {
					...state,
					draw: state.draw - 1,
				};
			} else {
				return state;
			}
		case 'END_TURN':
			if(action.player == 'player') {
				return {
					...state,
					maxMana: state.maxMana + 1,
					mana: state.maxMana + 1,
					draw: state.draw + 1,
				}
			} else {
				return state;
			}
		default:
			return state;
	}
}

export var enemyDeckReducer = (state = [], action) => {
	switch(action.type) {
		case 'GENERATE_DECK':
			var deck = [];
			if(action.player == 'enemy') {
				for (var i = 0; i < action.size; i++) {
					deck.push(generateCard());
				}
				return deck;
			} else {
				return state;
			}
		case 'GET_CARD': 
			if(action.player == 'enemy') {				
				return state.filter((card) => {return card.id !== action.card.id;});
			} else {
				return state;
			}
		default:
			return state;
	}
}

export var enemyHandReducer = (state = [], action) => {
	switch(action.type) {
		case 'GET_CARD': 
			if(action.player == 'enemy') {
				return [
					...state,
					action.card
				];
			} else {
				return state;
			}
		case 'PLACE_CARD':
			if(action.player == 'enemy') {
				return state.filter((card) => {return card.id !== action.card.id;});
			} else {
				return state;
			}
		default:
			return state;
	}
}

export var enemyForcesReducer = (state = {}, action) => {
	switch(action.type) {
		case 'PLACE_CARD':
			if(action.player == 'enemy') {
				return [
					...state,
					action.card
				];
			} else {
				return state;
			}
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