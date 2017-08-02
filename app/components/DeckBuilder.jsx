import React from 'react';
import {NavLink} from 'react-router-dom';

export class DeckBuilder extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="cardFlex fullWidth fullHeight columnOrder">
				<div className="cardGap cardFlex alignCenter">
					<div className="cardGap"></div>
					<div className="cardGap">
						<NavLink to="/decks">
							<button className='button large alert expanded'>
								Exit
							</button>
						</NavLink>
					</div>
					<div className="cardGap"></div>
					<div className="cardGap3">
							<input type="text" placeholder="Deck name..." />
					</div>
					<div className="cardGap"></div>
					<div className="cardGap">
						<NavLink to="/decks">
							<button className='button large success expanded'>
								Create new Deck
							</button>
						</NavLink>
					</div>
					<div className="cardGap"></div>
				</div>
				<div className="cardGap3 cardFlex columnOrder">
					
				</div>
				<div className="cardGap cardFlex">
					<div className="cardGap"></div>
					<div className="cardGap">
						<button className='button large primary expanded textGigantic'>
							{'<='}
						</button>
					</div>
					<div className="cardGap"></div>
					<div className="cardGap3">
							<button className='button large success hollow expanded'>
								Create new Deck
							</button>
					</div>
					<div className="cardGap"></div>
					<div className="cardGap">
						<button className='button large primary expanded textGigantic'>
							{'=>'}
						</button>
					</div>
					<div className="cardGap"></div>
				</div>
			</div>
		);
	}
}

export default DeckBuilder;