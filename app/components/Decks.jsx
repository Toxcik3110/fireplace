import React from 'react';

class Decks extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		return (
		<div className="right">
			<div className="Turn">
				Player2
			</div>
			<div className="CardDeck">
				
			</div>
			<div className="Turn">
				<button className="Player" id="player1">Your turn</button>
			</div>
			<div className="CardDeck">
				
			</div>
			<div className="Turn">
				Player1
			</div>
		</div>
		);
	}
}

export default Decks;