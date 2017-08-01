import React from 'react';

import Field from 'Field';
import Player from 'Player';
import Decks from 'Decks';

class Battle extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="wrapper">
				<div className="left">
					<Player player='enemy'/>
					<Field />
					<Player	player='player'/>
				</div>
				<Decks />
			</div>
		);
	}
}

export default Battle;