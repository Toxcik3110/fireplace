import React from 'react';
import {connect} from 'react-redux';

class Card extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		var {id, classes, atk, mana, hp, player, currentPlayer, whereIs, turn, playerTurn, baseHp} = this.props;
		var cl = 'Card ';
		var hpClass = '';
		if(classes) {
			cl += classes;
			if(currentPlayer) {
				if(currentPlayer.mana >= mana && whereIs === 'Hand' && player === playerTurn) {
					cl += ' playerActive';
				}
			}
			if(turn > 0 && whereIs === 'Forces' && player === playerTurn) {
				cl += ' playerActive';
			}
			if(hp < baseHp) {
				hpClass = ' debuffText';
			}
			if(whereIs === 'DeckBuilder') {

			}
		} else {
			cl += 'cardBack';
		}
		var renderStats = () => {
			if(classes)
			return (
				<div>
					<div className="manaCard">
						{mana}
					</div>
					<div className={'hpCard' + hpClass}>
						{hp}
					</div>
					<div className="atkCard">
						{atk}
					</div>
				</div>
			);
		}
		return (
		<div className={cl}
			onClick={this.props.onClick} 
			onMouseEnter={this.props.onMouseEnter}
			onMouseLeave={this.props.onMouseLeave}
			onMouseMove={this.props.onMouseMove}
		>
			{renderStats()}
		</div>
		);
	}
}

export default Card;