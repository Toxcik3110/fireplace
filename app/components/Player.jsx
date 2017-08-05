import React from 'react';
import uuid from 'node-uuid';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {socket} from 'MainApp';
import Hand from 'Hand';
import * as actions from 'actions';

export class Player extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		var {player, ePlayer, pPlayer, playerTurn, user, dispatch} = this.props;
		var currentPlayer = player == 'player' ? pPlayer : ePlayer;
		var enemyPlayer = player == 'player' ? pPlayer : ePlayer;
		var whoIs = player === 'player';
		if(currentPlayer.hp <= 0) {
			var data = {
				header: ()=>{
					return (<div>
							<h1 className='page-title' style={{color:whoIs ? 'red' : 'green'}}>
								{!whoIs ? 'YOU WIN' : 'YOU LOOSE'}
							</h1>
						</div>);
				},
				body: ()=>{
					return (<div>
								<NavLink to='/' onClick={(e) => {
									dispatch(actions.modalHide());
								}} >
									<button className='button hollow expanded'>Exit</button>
								</NavLink>
							</div>);
				},
			}
			dispatch(actions.modalShow(data));
		}
		return (
		<div className="player">
			<Hand player={player}/>
			<div className="ManaHp" id={player} onClick={(e) => {
				if(user.selectedCard && player !== 'player' && enemyPlayer.hp > 0) {
					dispatch(actions.attackPlayer(player, user.selectedCard));
					socket.emit('attackPlayer', {card:user.selectedCard});
				}
			}} >
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
			user:state.user,
			playerTurn:state.turn,
		}
	}
)(Player);