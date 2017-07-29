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

		// var classes = 'Card ' + this.state.classes;
		var classes = 'Card ';
		var inner = '';
		if(this.state.classes.length > 0) {
			// classes += 'cardFrame ' + this.state.classes;
			inner = 'innerCard ' + this.state.classes;
			classes += 'cardFrame ';
		}
		var renderStats = () => {
			if(inner)
			return (
				<div>
					<div className="manaCard">
						3
					</div>
					<div className="hpCard">
						4
					</div>
					<div className="atkCard">
						5
					</div>
				</div>
			);
		}
		return (
		<div className={classes}>
			<div className={inner}>

			</div>
			{renderStats()}
		</div>
		);
	}
}

export default Card;