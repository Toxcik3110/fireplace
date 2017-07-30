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

export var deselectCard = () => {
	return {
		type:'DESELECT_CARD',
	}
}