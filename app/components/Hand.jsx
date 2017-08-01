import React from 'react';
import uuid from 'node-uuid';
import {connect} from 'react-redux';

import Card from 'Card';
import * as actions from 'actions';

export class Hand extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		var {pHand, eHand, dispatch, player, playerTurn, e, p, pForces, eForces} = this.props;
		var hand = player == 'player' ? pHand : eHand;
		var forces = player == 'player' ? pForces : eForces;
		var currentPlayer = player == 'player' ? p : e;
		var cardItems = [];
		if(hand) cardItems = hand.map((card) => {
			return (<Card 
				key={card.id} 
				{...card}
				classes={card.classes ? card.classes : ''}
				player={player}
				currentPlayer={currentPlayer}
				playerTurn={playerTurn}
				whereIs={'Hand'}
				onClick={(e) => {
					if(card.mana <= currentPlayer.mana && forces.length < 7 && player === playerTurn) {
						dispatch(actions.placeCard(player, card));
					}
				}}
				/>)
		})
		return (
		<div className="Hand">
			<div className="cardGap"></div>
			{cardItems}
			<div className="cardGap"></div>
		</div>
		);
	}
}

export default connect(
	(state) => {
		return {
			pHand:state.playerHand,
			eHand:state.enemyHand,
			p:state.player,
			e:state.enemy,
			playerTurn:state.turn,
			pForces:state.playerForces,
			eForces:state.enemyForces,
		}
	}
)(Hand);