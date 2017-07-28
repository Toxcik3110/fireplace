import React from 'react';

import Field from 'Field';
import Player from 'Player';

class MainApp extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="wrapper">
				<div className="left">
					<Player player='player2' mana={0} maxMana={9} hp={10}/>
					<Field />
					<Player player='player1' mana={5} maxMana={10} hp={15}/>
				</div>
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
			</div>
		);
	}
}

export default MainApp;