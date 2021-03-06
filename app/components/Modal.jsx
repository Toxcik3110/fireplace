import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

export class Modal extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		// var {tooltip} = this.props;
		var {modal, dispatch} = this.props;
		var style = modal.show ? {'display':'visible'} : {'visibility':'hidden'};
		style = {
			...style,
			zIndex:5,
			// top:tooltip.top,
			// height:tooltip.height,
			// left:tooltip.left + tooltip.width + 20,
			backgroundColor:'rgba(0,0,0,0.8)',
		}
		var renderData = () => {
			return (<div className="cardGap2 cardFlex columnOrder">
						<div className="cardGap">
							<h1 className='page-title' style={{color:'red'}}>
								YOU LOOSE
							</h1>
						</div>
						<div className="cardGap cardFlex centerFlex">
							<NavLink to="/" onClick={(e) => {
								dispatch(actions.modalHide());
							}} >
								<button className='button hollow expanded'>Exit game</button>
							</NavLink>
						</div>
					</div>);
		}
		if(modal.data !== undefined) {
			renderData = () => {
				return (<div className="cardGap2 cardFlex columnOrder">
							<div className="cardGap">
								{modal.data.header()}
							</div>
							<div className="cardGap cardFlex centerFlex">
								{modal.data.body()}
							</div>
						</div>)
			}
		}
		return (
			<div className="cardModal cardFlex fullWidth fullHeight" style={style}>
				<div className="cardGap"></div>
				<div className="cardGap2 cardFlex columnOrder">
					<div className="cardGap"></div>
					{renderData()}
					<div className="cardGap"></div>
				</div>
				<div className="cardGap"></div>
			</div>
		);
	}
}

export default connect(
	(state) => {
		return {
			modal:state.modal,
		}
	}
)(Modal);