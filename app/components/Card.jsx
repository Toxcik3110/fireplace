import React from 'react';

class Card extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		var {classes, atk, mana, hp} = this.props;
		// var classes = 'Card ' + this.state.classes;
		var cl = 'Card ';
		var inner = '';
		if(classes) {
			// classes += 'cardFrame ' + this.state.classes;
			inner = 'innerCard ' + classes;
			cl += 'cardFrame ';
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
		<div className={cl}>
			<div className={inner}>

			</div>
			{renderStats()}
		</div>
		);
	}
}

export default Card;