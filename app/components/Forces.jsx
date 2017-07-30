import React from 'react';
import uuid from 'node-uuid';
import {connect} from 'react-redux';

import Card from 'Card';

export class Forces extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		var {player, eForces, pForces, playerTurn, dispatch, p, e} = this.props;
		var car = <h1>'ERROR'</h1>;
		var forces = player == 'player' ? pForces : eForces;
		var currentPlayer = player == 'player' ? p : e;
		if (forces) {
			car = forces.map((card) => {
				return (<Card 
				key={card.id} 
				mana={card.mana} 
				atk={card.atk} 
				hp={card.hp}
				classes={card.classes ? card.classes : ''}
				onClick={(e) => {
					// alert(player)
				}} 
				/>)
			});
		}
		return (
		<div className="forces">
			<div className="cardGap"></div>
			{car}
			<div className="cardGap"></div>
		</div>
		);
	}
}

export default connect(
	(state) => {
		return {
			pForces:state.playerForces,
			eForces:state.enemyForces,
			playerTurn:state.turn,
			p:state.player,
			e:state.enemy,
		}
	}
)(Forces);