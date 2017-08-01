import React from 'react';
import {connect} from 'react-redux';

import * as actions from 'actions';

export class Deck extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		var {player, dispatch, pDeck, eDeck, p, e, pHand, eHand} = this.props;
		var deck = player == 'player' ? pDeck : eDeck;
		var hand = player == 'player' ? pHand : eHand;
		var currentPlayer = player == 'player' ? p : e;
		var turnText = player === 'player' ? 'Your turn' : 'Enemy turn';
		// var activeClass = 'CardDeck ';
		var playerClass = 'playerActive';
		var enemyClass = 'enemyActive';
		var neutralClass = '';

		var renderDeck = (playerSide) => {
			var chosenClass = playerSide == 'player' ? playerClass : enemyClass;
			var turnClass = playerSide == player ? chosenClass : neutralClass;
			if(currentPlayer.draw == 0) turnClass = '';
			return (
				<div className='CardDeck' onClick={(e) => {
					if(currentPlayer.draw > 0 && playerSide == player && hand.length < 6) {
						var r = Math.floor(Math.random() * deck.length);
						dispatch(actions.getCard(player, deck[r]));
					}}
				}>
					<div className={'innerDeck ' + turnClass}> </div>
				</div>
			);
		}

		return (
		<div className="right">
			<div className={player == 'enemy' ? "Turn enemyText" : "Turn"}>
				Enemy
			</div>
			{renderDeck('enemy')}
			<div className="Turn">
				<button className="Player componentActive" id={player} onClick={(e) => {
					dispatch(actions.endTurn(player))
				}}>{turnText}</button>
			</div>
			{renderDeck('player')}
			<div className={player == 'player' ? "Turn playerText" : "Turn"}>
				Player
			</div>
		</div>
		);
	}
}

export default connect(
	(state) => {
		return {
			player:state.turn,
			pDeck:state.playerDeck,
			eDeck:state.enemyDeck,
			p:state.player,
			e:state.enemy,
			pHand:state.playerHand,
			eHand:state.enemyHand,
		}
	}
)(Deck);