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
		var {pHand, eHand, dispatch, player, palyerTurn, e, p} = this.props;
		var hand = player == 'player' ? pHand : eHand;
		var currentPlayer = player == 'player' ? p : e;
		var cardItems = [];
		if(hand) cardItems = hand.map((card) => {
			return (<Card key={uuid()} 
				mana={card.mana} 
				atk={card.atk} 
				hp={card.hp}
				classes={card.classes ? card.classes : ''} 
				onClick={(e) => {
					if(card.mana <= currentPlayer.mana) {
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
		}
	}
)(Hand);