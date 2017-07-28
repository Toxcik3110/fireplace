import React from 'react';

class Card extends React.Component {

	constructor(props) {
		super(props);
		var cl = '' || this.props.classes;
		// cl = cl.join(' ')
		
		this.state = {
			classes: cl,
		}
	}
	render() {
		var classes = this.state.classes + ' Card';
		return (
		<div className={classes}>
		
		</div>
		);
	}
}

export default Card;