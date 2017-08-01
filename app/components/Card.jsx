import React from 'react';
import {connect} from 'react-redux';

class Card extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		var {id, classes, atk, mana, hp, player, currentPlayer, whereIs, turn, playerTurn, baseHp} = this.props;
		var cl = 'Card ';
		var inner = '';
		var hpClass = '';
		if(classes) {
			inner = 'innerCard ' + classes;
			cl += 'cardFrame ';
			if(currentPlayer.mana >= mana && whereIs === 'Hand' && player === playerTurn) {
				inner += ' playerActive';
			}
			if(turn > 0 && whereIs === 'Forces' && player === playerTurn) {
				inner += ' playerActive';
			}
			if(hp < baseHp) {
				hpClass = ' debuffText';
			}
		}
		var renderStats = () => {
			if(inner)
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
		<div className={cl} onClick={this.props.onClick}>
			<div className={inner}>

			</div>
			{renderStats()}
		</div>
		);
	}
}

export default Card;