import React from 'react';
import uuid from 'node-uuid';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {socket} from 'MainApp';
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
				key={uuid()} 
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
				onMouseEnter={(e) => {
					dispatch(actions.tooltipShow());
					var rect = e.target.getBoundingClientRect();
					dispatch(actions.captureMouse(rect.top,rect.left,rect.width,rect.height))
					var obj = {
						...card,
						key:uuid(),
						classes:card.classes ? card.classes : '',
						whereIs:'Tooltip',
					};
					dispatch(actions.captureComponent(Card, obj));
				}}
				onMouseLeave={(e) => {
					dispatch(actions.tooltipHide());
				}}
				/>)
		})
		return (
		<div className="Hand" onContextMenu={(e) => {
					e.preventDefault();
					var data = {
						header: ()=>{
							return (<div><h1 className='page-title'>MENU</h1></div>);
						},
						body: ()=>{
							return (
							<div>
								<NavLink to='/' onClick={(e) => {
									dispatch(actions.modalHide());
								}} >
									<button className='button hollow expanded'>Exit to MainMenu</button>
								</NavLink>
								<NavLink to='/battle' onClick={(e) => {
									dispatch(actions.modalHide());
								}} >
									<button className='button hollow expanded'>Return to game</button>
								</NavLink>
							</div>);
						},
					}
					dispatch(actions.modalShow(data));
				}}>
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