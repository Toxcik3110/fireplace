import React from 'react';
import {connect} from 'react-redux';

export class ToolTip extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		var {tooltip} = this.props;
		var style = tooltip.show ? {'zIndex':3} : {'zIndex':0};
		style = {
			...style,
			top:tooltip.top,
			height:tooltip.height,
			left:tooltip.left + tooltip.width + 20,
			backgroundColor:'rgba(0,0,0,0.5)',
		}
		return (
			<div className="cardToolTip" style={style}>
				{tooltip.left}:{tooltip.top}
			</div>
		);
	}
}

export default connect(
	(state) => {
		return {
			tooltip:state.tooltip,
		}
	}
)(ToolTip);