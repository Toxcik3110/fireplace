import React from 'react';

import Field from 'Field';
import Player from 'Player';
import Decks from 'Decks';

class MainApp extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="wrapper">
				<div className="left">
					<Player cards={[{},{},{}]} player='enemy' mana={0} maxMana={9} hp={10}/>
					<Field />
					<Player cards={[{classes:'card1'},{classes:'card2'},{classes:'card3'}]} 
					player='player' mana={5} maxMana={10} hp={15}/>
				</div>
				<Decks />
			</div>
		);
	}
}

export default MainApp;