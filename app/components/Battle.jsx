import React from 'react';

import Field from 'Field';
import Player from 'Player';
import Deck from 'Deck';
import ToolTip from 'ToolTip';
import Modal from 'Modal';

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
				<Deck />
				<ToolTip />
				<Modal />
			</div>
		);
	}
}

export default Battle;