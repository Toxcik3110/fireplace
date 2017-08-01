import React from 'react';
import {connect} from 'react-redux';

export class Decks extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		// var {tooltip} = this.props;
		// var style = tooltip.show ? {'zIndex':3} : {'zIndex':0};
		// style = {
		// 	...style,
		// 	top:tooltip.top,
		// 	height:tooltip.height,
		// 	left:tooltip.left + tooltip.width + 20,
		// 	backgroundColor:'rgba(0,0,0,0.5)',
		// }
		return (
			<div className="">
				decks here
			</div>
		);
	}
}

export default connect(
	(state) => {
		return {
			decks:state.decks,
		}
	}
)(Decks);