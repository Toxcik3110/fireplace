import React from 'react';
import {connect} from 'react-redux';

export class ToolTip extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		var {tooltip, Component, ComponentProps} = this.props;
		var style = tooltip.show ? {'zIndex':3} : {'zIndex':0};
		style = {
			...style,
			// top:tooltip.top,
			top: (window.innerHeight/2 - 250) + 'px',
			height:tooltip.height,
			left:tooltip.left + tooltip.width + 20,
			// backgroundColor:'rgba(0,0,0,0.5)',
		}
		console.log('style', style);
		var renderComponent = () => {
			style = {
				...style,
				width: '400px',
				height: '543px',
			}
			// console.log('Component', Component);
			if(tooltip.Component) {
				return (<div className="cardToolTip" style={style}>
							<tooltip.Component {...tooltip.ComponentProps} />
						</div>)
			} else {
				return (<div className="cardToolTip" style={style}>
							{tooltip.left}:{tooltip.top}
						</div>)
			}
		}
		return (
			<div>
				{renderComponent()}
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