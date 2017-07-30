import React from 'react';
import uuid from 'node-uuid';
import {connect} from 'react-redux';

import Hand from 'Hand';

export class Player extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		var {player, hp, mana, maxMana, cards, ePlayer, pPlayer} = this.props;
		var currentPlayer = ePlayer;
		if(player === 'player') {
			currentPlayer = ePlayer;
		}
		return (
		<div className="player" id={player}>
			<Hand cards={cards} />
			<div className="ManaHp">
				<div className="hp">
					<div className="alert progress">
						<div className="progress-meter" 
						style={{width: Math.round((currentPlayer.hp/currentPlayer.maxHp)*100) + "%"}}>
							{currentPlayer.hp + '/' + currentPlayer.maxHp}
						</div>
					</div>
				</div>
				<div className="mana">
					<div className="progress">
						<div className="progress-meter" 
						style={{width: Math.round((currentPlayer.mana/currentPlayer.maxMana)*100) + "%"}}>
							{currentPlayer.mana + '/' + currentPlayer.maxMana}
						</div>
					</div>
				</div>
			</div>
		</div>
		);
	}
}

export default connect(
	(state) => {
		return {
			pPlayer:state.player,
			ePlayer:state.enemy
		}
	}
)(Player);