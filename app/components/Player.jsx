import React from 'react';
import uuid from 'node-uuid';
import {connect} from 'react-redux';

import Hand from 'Hand';

export class Player extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		var {player, ePlayer, pPlayer} = this.props;
		var currentPlayer = player == 'player' ? pPlayer : ePlayer;
		return (
		<div className="player">
			<Hand player={player}/>
			<div className="ManaHp" id={player}>
				<div className="hp">
					<div className="progressWrapper">
						<div className="cardGap"></div>
						<div className="alert progress">
							<div className="progress-meter" 
							style={{width: Math.round((currentPlayer.hp/currentPlayer.maxHp)*100) + "%"}}>
								{currentPlayer.hp + '/' + currentPlayer.maxHp}
							</div>
						</div>
						<div className="cardGap"></div>
					</div>
				</div>
				<div className="mana">
					<div className="progressWrapper">
						<div className="cardGap"></div>
						<div className="progress">
							<div className="progress-meter" 
							style={{width: Math.round((currentPlayer.mana/currentPlayer.maxMana)*100) + "%"}}>
								{currentPlayer.mana + '/' + currentPlayer.maxMana}
							</div>
						</div>
						<div className="cardGap"></div>
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
			ePlayer:state.enemy,
		}
	}
)(Player);