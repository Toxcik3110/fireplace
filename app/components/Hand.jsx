import React from 'react';
import uuid from 'node-uuid';

import Card from 'Card';

class Hand extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		var {cards} = this.props;
		var cardItems = cards.map((card) => {
			return (<Card key={uuid()} classes={card.classes ? card.classes : ''} />)
		})
		return (
		<div className="Hand">
			{cardItems}
		</div>
		);
	}
}

export default Hand;