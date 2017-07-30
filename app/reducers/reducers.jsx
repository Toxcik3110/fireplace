import uuid from 'node-uuid';

var createCard = (classes, mana, hp, atk) => {
	return {
		classes,
		mana,
		hp,
		atk,
		turn:0,
	}
}

var collection = [
	{
		classes:'card1',
		mana: 3,
		baseMana: 3,
		hp: 4,
		baseHp: 4,
		atk: 6,
		baseAtk: 6,
		turn:0,
		baseTurn:1,
	},
	{
		classes:'card2',
		mana: 1,
		baseMana: 1,
		hp: 1,
		baseHp: 1,
		atk: 1,
		baseAtk: 1,
		turn:0,
		baseTurn:1,
	},
	{
		classes:'card3',
		mana: 2,
		baseMana: 2,
		hp: 3,
		baseHp: 3,
		atk: 2,
		baseAtk: 2,
		turn:0,
		baseTurn:1,
	}
];

function generateCard() {
	var r = Math.floor(Math.random()*collection.length);
	return {
		id: uuid(),
		...collection[r]
	}
}


var initialPlayer = {hp:30, maxHp:30, mana:0, maxMana:0,draw:3}

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

export var playerForcesReducer = (state = [], action) => {
	switch(action.type) {
		case 'END_TURN':
			if(action.player == 'enemy') {
				return state.map((card) => {card.turn = card.baseTurn; return card});
			} else {
				return state;
			}
		case 'PLACE_CARD':
			if(action.player == 'player') {
				return [
					...state,
					action.card
				];
			} else {
				return state;
			}
		case 'ATTACK_CARD': 
			var newState = state.map((card) => { 
				if(action.playerCard.id === card.id) {
					card.hp -= action.enemyCard.atk;
					card.turn--;
				}
				if(action.enemyCard.id === card.id) {
					card.hp -= action.playerCard.atk;	
					card.turn--;
				}
				return card;
			})
			return newState.filter((card) => { return card.hp > 0 });
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

export var enemyForcesReducer = (state = [], action) => {
	switch(action.type) {
		case 'END_TURN':
			if(action.player == 'player') {
				return state.map((card) => {card.turn = card.baseTurn; return card});
			} else {
				return state;
			}
		case 'PLACE_CARD':
			if(action.player == 'enemy') {
				return [
					...state,
					action.card
				];
			} else {
				return state;
			}
		case 'ATTACK_CARD': 
			var newState = state.map((card) => { 
				if(action.playerCard.id === card.id) {
					card.hp -= action.enemyCard.atk;
					card.turn--;
				}
				if(action.enemyCard.id === card.id) {
					card.hp -= action.playerCard.atk;	
					card.turn--;
				}
				return card;
			})
			return newState.filter((card) => { return card.hp > 0 });
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

export var userReducer = (state = {selectedCard:undefined}, action) => {
	switch(action.type) {
		case 'END_TURN':
			return {
				...state,
				selectedCard:undefined,
			}
		case 'DESELECT_CARD':
			return {
				...state,
				selectedCard:undefined,
			}
		case 'SELECT_CARD':
			return {
				...state,
				selectedCard:action.card,
			}
		case 'ATTACK_CARD':
			return {
				...state,
				selectedCard:undefined,
			}
		default:
			return state;
	}
}