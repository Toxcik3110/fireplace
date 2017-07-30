import React from 'react';
import {connect} from 'react-redux';

class Card extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		var {classes, atk, mana, hp, player, dispatch, e, p, whereIs, turn} = this.props;
		var currentPlayer = player === 'player' ? p : e;
		var cl = 'Card ';
		var inner = '';
		if(classes) {
			inner = 'innerCard ' + classes;
			cl += 'cardFrame ';
			if(currentPlayer.mana >= mana && whereIs === 'Hand') {
				inner += ' playerActive';
			}
			if(turn > 0 && whereIs === 'Forces') {
				inner += ' playerActive';
			}
		}
		var renderStats = () => {
			if(inner)
			return (
				<div>
					<div className="manaCard">
						{mana}
					</div>
					<div className="hpCard">
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

export default connect(
	(state) => {
		return {
			p:state.player,
			e:state.enemy,
		}
	}
)(Card);