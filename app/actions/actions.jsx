export var endTurn = (player) => {
	return {
		type:'END_TURN',
		player,
	}
}

export var generateDeck = (player) => {
	return {
		type:'GENERATE_DECK',
		player,
		size:30,
	}
}

export var getCard = (player, card) => {
	return {
		type:'GET_CARD',
		player,
		card,
	}
}

export var placeCard = (player, card) => {
	return {
		type:'PLACE_CARD',
		player,
		card,
	}
}

export var selectCard = (player, card) => {
	return {
		type:'SELECT_CARD',
		player,
		card,
	}
}

export var attackCard = (playerCard, enemyCard) => {
	return {
		type:'ATTACK_CARD',
		playerCard,
		enemyCard,
	}
}

export var attackPlayer = (player, card) => {
	return {
		type:'ATTACK_PLAYER',
		player,
		card,
	}
}

export var deselectCard = () => {
	return {
		type:'DESELECT_CARD',
	}
}

export var tooltipShow = () => {
	return {
		type:'TOOLTIP_SHOW',
	}
}

export var tooltipHide = () => {
	return {
		type:'TOOLTIP_HIDE',
	}
}

export var toggleTooltip = () => {
	return {
		type:'TOGGLE_TOOLTIP',
	}
}

export var mouseMove = (x,y) => {
	return {
		type:'MOUSE_MOVE',
		x,
		y,
	}
}

export var captureMouse = (top,left,width,height) => {
	return {
		type:'CAPTURE_MOUSE',
		top,
		left,
		width,
		height,
	}
}

export var modalShow = (data) => {
	return {
		type:'MODAL_SHOW',
		data,
	}
}

export var modalHide = () => {
	return {
		type:'MODAL_HIDE',
	}
}

export var toggleModal = () => {
	return {
		type:'TOGGLE_MODAL',
	}
}

export var getDecks = () => {
	return {
		type:'GET_DECKS',
	}
}

export var addDeck = (deck) => {
	return {
		type:'ADD_DECK',
		deck,
	}
}

export var searchDeck = (id) => {
	return {
		type:'SEARCH_DECK',
		id,
	}
}

export var removeDeck = (id) => {
	return {
		type:'REMOVE_DECK',
		id,
	}
}

export var removeDeck = () => {
	return {
		type:'REMOVE_ALL_DECKS'
	}
}