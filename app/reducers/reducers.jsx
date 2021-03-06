import uuid from 'node-uuid';
import * as DeckAPI from 'DeckAPI';

var createCard = (classes, mana, hp, atk) => {
	return {
		classes,
		mana,
		hp,
		atk,
		turn:0,
	}
}

var baseId = 1;

export var collection = [
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
	},
	{
		classes:'card4',
		mana: 2,
		baseMana: 2,
		hp: 4,
		baseHp: 4,
		atk: 1,
		baseAtk: 1,
		turn:0,
		baseTurn:1,
	},
	{
		classes:'card5',
		mana: 4,
		baseMana: 4,
		hp: 7,
		baseHp: 7,
		atk: 2,
		baseAtk: 2,
		turn:0,
		baseTurn:1,
	},
	{
		classes:'card6',
		mana: 5,
		baseMana: 5,
		hp: 7,
		baseHp: 7,
		atk: 5,
		baseAtk: 5,
		turn:0,
		baseTurn:1,
	}
];

function generateCard() {
	var r = Math.floor(Math.random()*collection.length);
	baseId++;
	return {
		id: uuid(),
		...collection[r]
	}
}


var initialPlayer = {hp:5, maxHp:5, mana:0, maxMana:0,draw:3}

export var playerReducer = (state = initialPlayer, action) => {
	switch(action.type) {
		case 'ATTACK_PLAYER':
			if(action.player == 'player') {
				return {
					...state,
					hp: state.hp - action.card.atk,
				};
			} else {
				return state;
			}
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
				var ids = [];
				for (var i = 0; i < action.size; i++) {
					deck.push(generateCard());
					ids.push(deck[i].id);
				}
				console.log(ids);
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
		case 'SET_DECK': {
			if(action.player == 'player') {	
				return [...action.deck];
			} else {
				return state;
			}
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
		case 'ATTACK_PLAYER':
			if(action.player == 'enemy') {
				return state.map((card) => {
					if(action.card.id === card.id) {
						card.turn--;
					}
					return card;
				});
			} else {
				return state;
			}
		default:
			return state;
	}
}

export var enemyReducer = (state = initialPlayer, action) => {
	switch(action.type) {
		case 'ATTACK_PLAYER':
			if(action.player == 'enemy') {
				return {
					...state,
					hp: state.hp - action.card.atk,
				};
			} else {
				return state;
			}
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
		case 'SET_DECK': {
			if(action.player == 'enemy') {	
				return [...action.deck];
			} else {
				return state;
			}
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
		case 'PLACE_CARD_DIRECT':
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
		case 'ATTACK_PLAYER':
			if(action.player == 'player') {
				return state.map((card) => {
					if(action.card.id === card.id) {
						card.turn--;
					}
					return card;
				});
			} else {
				return state;
			}
		default:
			return state;
	}
}

export var turnReducer = (state = 'player', action) => {
	switch(action.type) {
		case 'SET_TURN':
			return action.player;
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
		case 'ATTACK_PLAYER':
			return {
				...state,
				selectedCard:undefined,
			}
		default:
			return state;
	}
}

export var tooltipReducer = (state = {x:0,
									y:0,
									show:false,
									left:0,
									width:0,
									top:0,
									height:0,
									Component:undefined,
									ComponentProps:undefined,
									}, action) => {
	switch(action.type) {
		case 'TOOLTIP_SHOW':
			return {
				...state,
				show:true,
			}
		case 'TOOLTIP_HIDE':
			return {
				...state,
				show:false,
			}
		case 'TOGGLE_TOOLTIP':
			return {
				...state,
				show:!state.show,
			}
		case 'MOUSE_MOVE':
			return {
				...state,
				x:action.x,
				y:action.y,
			}
		case 'CAPTURE_MOUSE':
			return {
				...state,
				left:action.left,
				width:action.width,
				height:action.height,
				top:action.top,
			}
		case 'CAPTURE_COMPONENT':
			return {
				...state,
				Component:action.component,
				ComponentProps:action.componentProps,
			}
		default:
			return state;
	}
}

export var modalReducer = (state = {show:false,data:undefined}, action) => {
	switch(action.type) {
		case 'MODAL_SHOW':
			return {
				...state,
				show:true,
				data:action.data,
			}
		case 'MODAL_HIDE':
			return {
				...state,
				show:false,
			}
		case 'TOGGLE_MODAL':
			return {
				...state,
				show:!state.show,
			}
		default:
			return state;
	}
}

export var deckReducer = (state = [], action) => {
	switch(action.type) {
		case 'GET_DECKS':
			return DeckAPI.getDecks();
		case 'ADD_DECK':
			return DeckAPI.addDeck(action.deck);
		case 'SEARCH_DECK':
			return DeckAPI.searchDeck(state, action.id);
		case 'REMOVE_DECK':
			return DeckAPI.removeDeck(state, action.id);
		case 'REMOVE_ALL_DECK':
			return DeckAPI.removeAllDecks();
		default:
			return state;
	}
}

export var socketReducer = (state = {}, action) => {
	switch(action.type) {
		default:
			return state;
	}
}