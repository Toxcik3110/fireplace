import React from 'react';
import uuid from 'node-uuid';

import Card from 'Card';

class Forces extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		var {cards, player} = this.props;
		var car = <h1>'ERROR'</h1>;
		if (cards) {
			car = cards.map((card) => {
				return (<Card key={uuid()} classes={card.classes ? card.classes : ''} />)
			});
		}
		return (
		<div className="forces" id={player}>
			<div className="cardGap"></div>
			{car}
			<div className="cardGap"></div>
		</div>
		);
	}
}

export default Forces;