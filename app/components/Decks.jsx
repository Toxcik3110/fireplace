import React from 'react';
// import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import * as DeckAPI from 'DeckAPI';

export class Decks extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			decks: DeckAPI.getDecks(),
		}
	}
	render() {
		var {decks} = this.state;
		var renderDecks = () => {
			if(decks.length == 0) {
				return (<div className="cardGap cardGrid cardGrid2x3">
					<h1 className='justifySelfCenter alignSelfCenter'>Elem1</h1>
					<h1 className='justifySelfCenter alignSelfCenter'>Elem2</h1>
					<h1 className='justifySelfCenter alignSelfCenter'>Elem3</h1>
					<h1 className='justifySelfCenter alignSelfCenter'>Elem4</h1>
					<h1 className='justifySelfCenter alignSelfCenter'>Elem5</h1>
					<h1 className='justifySelfCenter alignSelfCenter'>Elem6</h1>
				</div>)	
			} else {
				return (<div className="cardGap cardFlex centerFlex">
					<h1>
						<small>Empty</small>
					</h1>
				</div>)	
			}
		}
		return (
			<div className="cardFlex fullWidth fullHeight">
				<div className="cardGap"></div>
				<div className="cardGap5 columnOrder cardFlex">
					<div className="cardGap">
						<h1 className="page-title">Your Decks</h1>
					</div>
					<div className="cardGap3 cardFlex">
						<div className="cardGap5 callout cardFlex">
							{renderDecks()}
						</div>
					</div>
					<div className="cardGap cardFlex alignCenter">
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
					</div>
				</div>
				<div className="cardGap"></div>
			</div>
		);
	}
}

// export default connect(
// 	(state) => {
// 		return {
// 			decks:state.decks,
// 		}
// 	}
// )(Decks);

export default Decks;