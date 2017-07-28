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
		var classes = 'cardd ' + this.state.classes;
		return (
		<div className="Card">
			<div className={classes}>

			</div>
		</div>
		);
	}
}

export default Card;