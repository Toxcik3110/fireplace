import React from 'react';
import {NavLink} from 'react-router-dom';
// import {Button} from 'elemental';

class Menu extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			modalIsOpen:false,
		}
		this.toggleModal = this.toggleModal.bind(this);
	}

	toggleModal() {
		this.setState({
			modalIsOpen:!this.state.modalIsOpen,
		});
		return this.state.modalIsOpen;
	}

	render() {
		return (
			<div className="gameMenu cardFlex centerFlex fullWidth fullHeight">
				<div className="cardGap"></div>
				<div className="cardGap3 cardFlex alignCenter justifyAround columnOrder fullHeight">
					<div className="cardGap cardFlex centerFlex width100">
						<h1 className='gameTitle'>Fireplace</h1>
					</div>
					<div className='cardFlex cardGap centerFlex width100'><h3>Main menu</h3></div>
					<div className="menu cardFlex columnOrder alignCenter cardGap3 width100">
						<li><NavLink to="/battle" activeClassName="active-link" activeStyle={{fontWeight: 'bold'}}>Battle</NavLink></li>
						<li><NavLink to="/about" activeClassName="active-link" activeStyle={{fontWeight: 'bold'}}>About</NavLink></li>
						<li><NavLink to="/repo" activeClassName="active-link" activeStyle={{fontWeight: 'bold'}}>Repository</NavLink></li>
					</div>
				</div>
				<div className="cardGap"></div>
			</div>
		);
	}
}

export default Menu;