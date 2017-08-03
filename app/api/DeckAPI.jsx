var $ = require('jquery'); 

export var addDeck = (deck) => {
	var stringDecks = localStorage.getItem('decks');
	var decks = [];
	console.log(decks)
	try {
		decks = JSON.parse(stringDecks);
		if(!decks) {
			decks = [];
		}
	} catch(e) {
		// console.error('faild')
	}
	decks.filter((item) => {
		return deck.name !== item.name;
	})
	decks = [...decks, deck];
	localStorage.setItem('decks', JSON.stringify(decks))
	return decks;
}

export var getDecks = () => {
	var stringDecks = localStorage.getItem('decks');
	var decks = [];
	try {
		decks = JSON.parse(stringDecks);
	} catch(e) {

	}

	return $.isArray(decks) ? decks : [];
}

export var searchDecks = (decks, id) => {
	decks = decks.filter((deck) => {
		return deck.id === id;
	});

	return decks;
}	

export var setDecks = (decks) => {
	if($.isArray(decks)) {
		localStorage.setItem('decks', JSON.stringify(decks))
		return decks;
	}
}

export var removeDeck = (deck, id) => {
	decks = decks.filter((deck) => {
		return deck.id !== id;
	});

	return setDecks(decks);
}	

export var removeAllDecks = (deck, id) => {
	localStorage.removeItem('decks');

	return [];
}	
