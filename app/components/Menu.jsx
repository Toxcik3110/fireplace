import React from 'react';
import {NavLink} from 'react-router-dom';
// import {Button} from 'elemental';

import * as DeckAPI from 'DeckAPI';

class Menu extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var decks = DeckAPI.getDecks();
		var renderBattle = () => {
			if(decks.length > 0)
			{
				return (<li>
							<NavLink to="/browser">
							Search game</NavLink></li>)
			} else {
				return (<li>
					<NavLink to="/" style={{color:'red'}} 
					onClick={(e) => {
						alert('Not enough decks to play! Create some in "Decks" menu!')
					}}>Search game</NavLink>
					</li>)
			}
		}
		return (
			<div className="gameMenu cardFlex centerFlex fullWidth fullHeight">
				<div className="cardGap"></div>
				<div className="cardGap3 cardFlex alignCenter justifyAround columnOrder fullHeight">
					<div className="cardGap cardFlex centerFlex width100">
						<h1 className='gameTitle'>Fireplace</h1>
					</div>
					<div className='cardFlex cardGap centerFlex width100'><h3>Main menu</h3></div>
					<div className="menu cardFlex columnOrder alignCenter cardGap3 width100">
						{renderBattle()}
						<li>
							<NavLink to="/decks" 
							activeClassName="active-link" 
							activeStyle={{fontWeight: 'bold'}}>
								Decks[{decks.length}]
							</NavLink>
						</li>
						<li>
							<a href='https://github.com/Toxcik3110/fireplace'>Repository</a>
						</li>
					</div>
				</div>
				<div className="cardGap"></div>
			</div>
		);
	}
}

export default Menu;