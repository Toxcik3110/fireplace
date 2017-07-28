import React from 'react';
import uuid from 'node-uuid';

import Card from 'Card';
import Hand from 'Hand';

class Player extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		var {player, hp, mana, maxMana} = this.props;
		return (
		<div className="player" id={player}>
			<Hand cards={[{},{},{}]} />
			<div className="ManaHp">
				<div className="hp">
					<div className="alert progress">
						<div className="progress-meter" 
						style={{width: Math.round((hp/20)*100) + "%"}}>
							{hp + '/20'}
						</div>
					</div>
				</div>
				<div className="mana">
					<div className="progress">
						<div className="progress-meter" 
						style={{width: Math.round((mana/maxMana)*100) + "%"}}>
							{mana + '/' + maxMana}
						</div>
					</div>
				</div>
			</div>
		</div>
		);
	}
}

export default Player;