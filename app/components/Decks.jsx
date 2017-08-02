import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

export class Decks extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="cardFlex fullWidth fullHeight columnOrder">
				<div className="cardGap">
					<h1 className="page-title">Your decks</h1>
				</div>
				<div className="cardGap3 cardFlex columnOrder">
					
				</div>
				<div className="cardGap cardFlex alignCenter">
					<div className="cardGap"></div>
					<div className="cardGap">
						<button className='button large primary expanded'>
							{'<='}
						</button>
					</div>
					<div className="cardGap"></div>
					<div className="cardGap3">
						<NavLink to="/DeckBuilder">
							<button className='button large success hollow expanded'>
								Create new Deck
							</button>
						</NavLink>
					</div>
					<div className="cardGap"></div>
					<div className="cardGap">
						<button className='button large primary expanded'>
							{'=>'}
						</button>
					</div>
					<div className="cardGap"></div>
				</div>
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