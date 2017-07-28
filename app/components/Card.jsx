import React from 'react';

class Card extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		var {card} = this.props;
		return (
			<div className="card">
				<div className="topCard">
					<div className="manaCard">
						3
					</div>
					<div className="imageCard">
					
					</div>
					<div className="nameCard">
						Kitten
					</div>
				</div>
				<div className="bottomCard">
					<div className="abilitiesCard">
						Nothing special
					</div>
					<div className="typeCard">
						Cat
					</div>
					<div className="hpCard">
						4
					</div>
					<div className="atkCard">
						5	
					</div>
				</div>
			</div>
		);
	}
}

export default Card;