import React from 'react';
import {connect} from 'react-redux';

import * as actions from 'actions';

export class Decks extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		var {player, dispatch, pDeck, eDeck, p, e} = this.props;
		var deck = player == 'player' ? pDeck : eDeck;
		var currentPlayer = player == 'player' ? p : e;
		var turnText = player === 'player' ? 'Your turn' : 'Enemy turn';
		return (
		<div className="right">
			<div className="Turn">
				Enemy
			</div>
			<div className="CardDeck" onClick={(e) => {
				if(currentPlayer.draw > 0) {
					var r = Math.floor(Math.random() * deck.length);
					dispatch(actions.getCard(player, deck[r]));
				}
			}}>
				
			</div>
			<div className="Turn">
				<button className="Player" id={player} onClick={(e) => {
					dispatch(actions.endTurn(player))
				}}>{turnText}</button>
			</div>
			<div className="CardDeck" onClick={(e) => {
				if(currentPlayer.draw > 0) {
					var r = Math.floor(Math.random() * deck.length);
					dispatch(actions.getCard(player, deck[r]));
				}
			}}>
				
			</div>
			<div className="Turn">
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
		}
	}
)(Decks);