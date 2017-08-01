import React from 'react';
import {NavLink} from 'react-router-dom';

class Menu extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="gameMenu cardFlex centerFlex fullWidth fullHeight">
				<div className="cardGap"></div>
				<div className="cardGap3 cardFlex alignCenter justifyAround columnOrder fullHeight">
					<div className="cardGap cardFlex centerFlex">
						<h1 className='gameTitle'>Fireplace</h1>
					</div>
					<div className="cardGap">
						<ul className="menu cardFlex columnOrder alignCenter">
							<li className="menu-text">Main menu</li>
							<li><NavLink to="/battle" activeClassName="active-link" activeStyle={{fontWeight: 'bold'}}>Battle</NavLink></li>
						</ul>
					</div>
				</div>
				<div className="cardGap"></div>
			</div>
		);
	}
}

export default Menu;