import React from 'react';
import uuid from 'node-uuid';
import {connect} from 'react-redux';

import Card from 'Card';

export class Forces extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		var {player, eForces, pForces, playerTurn, dispatch} = this.props;
		var car = <h1>'ERROR'</h1>;
		var forces = player == 'player' ? pForces : eForces;
		if (forces) {
			car = forces.map((card) => {
				return (<Card key={uuid()} 
				mana={card.mana} 
				atk={card.atk} 
				hp={card.hp}
				classes={card.classes ? card.classes : ''} 
				/>)
			});
		}
		return (
		<div className="forces" id={player}>
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
		}
	}
)(Forces);