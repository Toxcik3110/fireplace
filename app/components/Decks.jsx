import React from 'react';
import {connect} from 'react-redux';

import * as actions from 'actions';

export class Decks extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		var {player, dispatch} = this.props;
		var turnText = player === 'player' ? 'Your turn' : 'Enemy turn';
		return (
		<div className="right">
			<div className="Turn">
				Enemy
			</div>
			<div className="CardDeck">
				
			</div>
			<div className="Turn">
				<button className="Player" id={player} onClick={(e) => {
					dispatch(actions.endTurn())
				}}>{turnText}</button>
			</div>
			<div className="CardDeck">
				
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
			player:state.turn
		}
	}
)(Decks);