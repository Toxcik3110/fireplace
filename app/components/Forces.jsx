import React from 'react';
import uuid from 'node-uuid';
import {connect} from 'react-redux';

import * as actions from 'actions';
import Card from 'Card';

export class Forces extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		var {player, eForces, pForces, playerTurn, dispatch, p, e, user} = this.props;
		var car = <h1>'ERROR'</h1>;
		var forces = player == 'player' ? pForces : eForces;
		var currentPlayer = player == 'player' ? p : e;
		if (forces) {
			car = forces.map((card) => {
				return (<Card 
				key={card.id} 
				{...card}
				player={player}
				currentPlayer={currentPlayer}
				playerTurn={playerTurn}
				whereIs={'Forces'}
				classes={card.classes ? card.classes : ''}
				onClick={(e) => {
					var cond = !user.selectedCard && (playerTurn === player) && (card.turn > 0);
					if(user.selectedCard && playerTurn !== player) {
						dispatch(actions.attackCard(user.selectedCard, card));
					} else if (cond) {
						dispatch(actions.selectCard(player, card));
					} else if (user.selectedCard === card) {
						dispatch(actions.deselectCard());
					}
				}}
				onMouseEnter={(e) => {
					dispatch(actions.tooltipShow());
					var rect = e.target.getBoundingClientRect();
					dispatch(actions.captureMouse(rect.top,rect.left,rect.width,rect.height))
				}}
				onMouseLeave={(e) => {
					dispatch(actions.tooltipHide());
				}}
				onMouseMove={(e) => {
					// dispatch(actions.mouseMove(e.pageX, e.pageY))
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
			user:state.user,
		}
	}
)(Forces);